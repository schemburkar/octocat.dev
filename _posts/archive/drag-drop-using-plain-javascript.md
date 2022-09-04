---
title: "Drag & drop using plain JavaScript"
excerpt: "Yes. No library or ton of packages, jsut plain JavaScript for Drag & drop"
coverImage: ""
date: "2020-03-17T20:49:13+05:30"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: ""
isHeroPost: false
isArchive: true
---

Yes. No library or ton of packages.

Demo here - [http://jsfiddle.net/zfnj5rv4/](http://jsfiddle.net/zfnj5rv4/)  
Source : MDN -[https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover\_event](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event)

Here is the code:

**JavaScript**
```js
var dragged;

/\* events fired on the draggable target \*/
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/\* events fired on the drop targets \*/
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }

}, false);
```

**HTML**

```html
<div class="dropzone">
    <div id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
        This div is draggable
    </div>
</div>
<div class="dropzone"></div>
<div class="dropzone"></div>
<div class="dropzone"></div>
```

**Events**

*   **dragstart/dragend** \- Occurs when the dragging has started and ended.
*   **dragenter/dragleave** - Occurs when a element being dragged enters or leaves a potential target element.
*   **dragover** \- Occurs when a element being dragged has entered and hovering within a potential target element.
*   **drop** \- Occurs when a element being dragged is dropped on the target element.

**Live demo from Mozilla MDN**

https://mdn.mozillademos.org/en-US/docs/Web/API/Document/drag\_event$samples/Examples?revision=1470009

Hope this article helps implementation of drag and drop