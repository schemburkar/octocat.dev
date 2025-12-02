---
title: "Performance updates using Span<T> in .NET 8"
excerpt: "Deep dive into improving a file parser by using Span<T> introduced recently in .NET 8"
coverImage: "https://worldwidecode.files.wordpress.com/2024/04/span-dotnet-8.jpg?w=1024"
date: "2024-04-14T01:17:00.000Z"
author:
  name: Shubhan Chemburkar
  picture: "https://worldwidecode.files.wordpress.com/2023/07/sc.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2024/04/span-dotnet-8.jpg"
coverImageAspectRatio: 1.6
---

There is a file parser that I used in one of my *hobby* projects that was not optimized and consuming a lot of memory.

The file in question a list of dates and prices per line.

```
...
2024-04-02 1266.1963
2024-04-03 1266.5501
2024-04-04 1266.8667
2024-04-05 1264.6353
2024-04-08 1265.3408
2024-04-10 1266.0959
...
```

The original source code below using LINQ

```cs
return (T)data.Split(new char[] { '\r', '\n' })
        .Where(a => !string.IsNullOrWhiteSpace(a)).Select(line => line.Split(' '))
        .Select(x => new NAV(DateTime.Parse(x[0]), double.Parse(x[1]))).AsEnumerable();
```

In the above code, `data` from the file is split  for `newline` characters, followed by spiltting the line by `space`. Then parse the two tokens as `DateTime` and `double`.

My first attempt at improving performance with `AsParallel` resulted in small improvement but worse memory consumption


```cs
return (T)data.Split(new char[] { '\r', '\n' }).AsParallel()
        .Where(a => !string.IsNullOrWhiteSpace(a)).Select(line => line.Split(' ')).AsParallel()
        .Select(x => new NAV(DateTime.Parse(x[0]), double.Parse(x[1]))).AsEnumerable();
```

| Method                    | Mean     | Error   | StdDev  | Gen0    | Gen1    | Allocated |
|---------------------------|---------:|--------:|--------:|--------:|--------:|----------:|
| **DeserializeAsParallel** | 457.7 us | 6.59 us | 5.84 us | 89.8438 | 42.9688 | 710.77 KB |
| DeserializeSingleThread   | 518.5 us | 7.10 us | 5.93 us | 67.3828 | 25.3906 | 555.13 KB |


Now decided to starting think diffrently and figured out .NET 8 added support for `Split` over a `Span<T>`. [Performance improvements in ASP.NET Core 8](https://devblogs.microsoft.com/dotnet/performance-improvements-in-aspnet-core-8/#spans)


Let's get into the low-level details. First get `Span` from string with `AsSpan()` extension.

- Allocate `Span<Range>` rows with the number of `newlines` in the `content`.

    ```cs
    var content = data.AsSpan();
    Span<Range> rows = stackalloc Range[content.Count(['\r', '\n']) + 1];
    ```

- Use the new `Split` method to populate the `rows` with data.
    ```cs
    int ReadOnlySpan<char>.Split(Span<Range> destination, ReadOnlySpan<char> separator)
    ```
    ```cs
    var count = content.Split(rows, ['\r', '\n']);
    ```


    A quick check on the `rows` in debug reveals, its populated with start and end indexes of each row.

    ```cs
    [0] [Range]:{0..18}
    [1] [Range]:{20..38}
    [2] [Range]:{40..58}
    [3] [Range]:{60..78}
    [4] [Range]:{80..98}
    [5] [Range]:{100..118}
    [6] [Range]:{120..138}
    [7] [Range]:{140..158}
    [8] [Range]:{160..177}
    [9] [Range]:{179..197}
    ```
    *Note: `content.Count()` and `count` variable from the Split should be the same.* 

- Few mode Range allocations to store the tokens per line and the actual results

    ```cs
    Span<Range> tokens = stackalloc Range[2];
    Span<NAV> results = stackalloc NAV[count];
    ```

    `Span<Range> tokens` uses a length of `2` as there would only be two data points, `DateTime` and `double`.
    `Span<NAV> results` would be the same as the number of rows in the file, hence use `count`
``` 

```

- Now iterate over every line using a traditional `for` loop. 

  `rows[i]` will point to the `Range` of the current line, while `content[Range]` will give us the actual `ReadOnlySpan<char>` for the current line.

    ```cs
    for (int i = 0; i < count; i++)
    {
        var currentLine = content[rows[i]];
    }
    ```

    Visualization of `currentLine`

    ```cs
    "2006-04-01 10.5745"
    [0] [char]:50 '2'
    [1] [char]:48 '0'
    [2] [char]:48 '0'
    [3] [char]:54 '6'
    [4] [char]:45 '-'
    [5] [char]:48 '0'
    [6] [char]:52 '4'
    [7] [char]:45 '-'
    [8] [char]:48 '0'
    [9] [char]:49 '1'
    [10] [char]:32 ' '
    [11] [char]:49 '1'
    [12] [char]:48 '0'
    [13] [char]:46 '.'
    [14] [char]:53 '5'
    [15] [char]:55 '7'
    [16] [char]:52 '4'
    [17] [char]:53 '5'
    ```



- Next up is again using `Split` to get the `tokens`.

  Use `Split` again to populate `Span<Range> tokens` and parse data using it.

    ```cs
    currentLine.Split(tokens, [' ']);

    DateTime.Parse(currentLine[tokens[0]]); // "2006-04-01"
    double.Parse(currentLine[tokens[1]]); // "10.5745"
    ```

- The entire code below, with some optimizations added to collect the results.

    ```cs
    var content = data.AsSpan();
    Span<Range> rows = stackalloc Range[content.Count(['\r', '\n']) + 1];

    var count = content.Split(rows, ['\r', '\n']);

    Span<Range> tokens = stackalloc Range[2];
    Span<NAV> results = stackalloc NAV[count];

    int j = 0;
    for (int i = 0; i < count; i++)
    {
        var currentLine = content[rows[i]];
        if (currentLine.IsWhiteSpace()) continue;

        currentLine.Split(tokens, [' ']);
        results[j] = new NAV(DateTime.Parse(currentLine[tokens[0]]), double.Parse(currentLine[tokens[1]]));
        j++;
    }

    return results[0..j].ToArray();
    ```

- Using `Span<T>` method not is better than the optimizations done earlier with `Parallel`, it significantly uses less memory


| Method                  | Mean     | Error   | StdDev  | Gen0    | Gen1    | Allocated |
|------------------------ |---------:|--------:|--------:|--------:|--------:|----------:|
| DeserializeAsParallel   | 457.7 us | 6.59 us | 5.84 us | 89.8438 | 42.9688 | 710.77 KB |
| DeserializeSingleThread | 518.5 us | 7.10 us | 5.93 us | 67.3828 | 25.3906 | 555.13 KB |
| **DeserializeWithSpan** | 456.3 us | 2.46 us | 1.92 us |  8.3008 |       - |  **70.11 KB** |

The memory allocations have dropped to just 70 KB about a tenth of the next best method  `DeserializeAsParallel`.

Running the same benchmark on a larger file (122 KB vs 38 KB in previous run), provides more data. `DeserializeWithSpan` is still faster with very less memory allocations.


| Method                  | Mean     | Error     | StdDev    | Gen0     | Gen1     | Gen2    | Allocated  |
|------------------------ |---------:|----------:|----------:|---------:|---------:|--------:|-----------:|
| DeserializeAsParallel   | 1.350 ms | 0.0158 ms | 0.0148 ms | 261.7188 | 144.5313 | 85.9375 | 1787.88 KB |
| DeserializeSingleThread | 1.782 ms | 0.0274 ms | 0.0228 ms | 175.7813 |  87.8906 | 87.8906 | 1500.08 KB |
| **DeserializeWithSpan** | 1.302 ms | 0.0068 ms | 0.0057 ms |  58.5938 |  58.5938 | 58.5938 |  **183.12 KB** |


### Concluding

Overall this optimization increased the throughput of web requests that were getting stalled in this *slower* hotpath.

Further optimization is possible to limit the number of lines read by using date filters, thats for another time!

### Discussion

For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.


## References

- [MemoryExtensions.Split Method](https://learn.microsoft.com/en-us/dotnet/api/system.memoryextensions.split?view=net-8.0)
- [Performance improvements in ASP.NET Core 8](https://devblogs.microsoft.com/dotnet/performance-improvements-in-aspnet-core-8/#spans)


  