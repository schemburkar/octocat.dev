---
title: "How not to secure logins"
excerpt: "There are plenty of examples of how to implement login in a website or app securely. Or how to enforce strong passwords.

Here is a list of popular websites/apps used for tracking financials, banks, mutual funds etc. that have varied degree of poor password policies."
coverImage: "https://worldwidecode.files.wordpress.com/2021/05/security-wallpaper.jpg?w=1080"
date: "2021-05-29T19:50:24+05:30"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2021/05/security-wallpaper.jpg?w=1080"
isArchive: true
---

There are plenty of examples of how to implement login in a website or app securely. Or how to enforce strong passwords.

Here is a list of popular websites/apps used for tracking financials, banks, mutual funds etc. that have varied degree of poor password policies.

Most sites in India do not support two factor authentication apps like Microsoft/Google Authenticator 1Password or Authy etc. Lets not even talk about security devices like YUBI Key at all.

Then there is reliance on the insecure SMS/text based password recovery system.

Here's the list (in no particular order)

**CAMS**

What is CAMS: Manages the backend financial data for 16+ mutual funds in India.

*   Implements two factor authentication that is merely a second password. i.e. Security question that you answer
*   ‘I am not a robot’ is just a checkbox. No advanced captcha or anything that will actually stop a robot crawler
*   Entering the security question input does not accept ‘enter’ character for form submit.

Password Policy

*   Password should be in alphanumeric and start with an alphabet.
*   Password length should be minimum 8 and maximum 15 characters.
*   Password must contain minimum one upper case alphabet and one numeric value.
*   Password must contain one of these special characters #\_ $ @.
*   Password cannot be same as last 3 passwords.
*   Password will expire in every 90 days.

**Paytm**

What is Paytm: e-Wallet, bill payment and peer-to-peer UPI payment app & website in India

*   Requires two factor login based on its own algorithm, not always.
*   Change password form in un-minified React app, open for developers to inspect.

Password Policy

*   Does not allow ‘paste’ from password manager when changing password
*   Minimum password length : 5 characters
*   Only special characters detected are   .\*\[{},/@!$#+:.”\*;\_-\]  
    (any other character is not a special character by its logic)
*   Commonly used password check does not allow following values as password: password, qwerty, paytm

**ICICI Bank**

What is ICICI Bank: One of the top largest private bank in India

*   Does not support paste from password managers for generating new password.
*   Does not support two factor authentication for login
*   Guidelines request you to disable autocomplete for login, e.g. Password managers. That too using Internet Explorer, no mention of any modern Browsers

Password Policy

*   Password should be a mix of alphabets with a minimum of 1 upper case letter \[A-Z\], numerals and special characters ( $#^@\\&%\_.~!\*) without any space in between.
*   The password length should be between 8 to 28 characters.  
    New password cannot be the same as any of the last four login password.

**HDFC Bank**

What is HDFC Bank: One of the top largest private bank in India

Password Policy

*   IPIN (password) should be alphanumeric, with minimum 6 characters and maximum 15 characters. Special characters ( ' " % + are not allowed.
*   In case the IPIN is not changed then for security reasons every 120 days you would be asked to compulsorily change your IPIN
*   Does not support two factor authentication, may be required if brute force attack is detected.

**ICICI Prudential Mutual Fund**

What is ICICI Prudential Mutual Fund: Mutual fund house from ICICI Prudential , offers a host of mutual funds to invest in.

Password Policy

*   Your password should be 8 - 13 characters long.
*   For security reasons it should contain atleast one alphabet, numeric and a special (!@#$%^&\*) character and one alphabet in upper case.
*   Does not support two factor authentication

**Traces**

What is Traces: Tax Processing and reconciliation system for tax payers and tax deductors in India.

*   Restricts from entering special characters in password other than approved list.
*   Does not allow password like : password, god, 123456, 123, letmein, iloveyou, abc123, 654321, baseball
*   Does not support two factor authentication

Password Policy

*   Minimum length = 8; Maximum length = 15
*   Should contain both alphabets and numbers (a-z, A-Z, 0-9) and should have atleast one letter in Upper Case
*   Password cannot be same as User Id
*   Is case sensitive
*   New Password cannot be same as last password
*   Special characters allowed: space   ' &  " , ;

**PhonePe**

What is PhonePe: Bill payment and Payment Provider, offers mobile app

*   Support OTP (One-Time-Passcode) via SMS/text on phone number OR
*   4 digit login password

**KFin**

What is KFin: Mutual fund backend system for many funds in India

*   Does not support two factor authentication

Password Policy

*   Should have minimum 8 characters with at least 1 special character, 1 number, 1 upper case.
*   Password should be between 8 - 20 characters only

There are many more such examples, and hope the above list highlight the risk we all accept to take every day.

**What should be done, some guidance**

[Troy Hunt: Passwords Evolved: Authentication Guidance for the Modern Era](https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/)

[How long should my passwords be? | 1Password](https://blog.1password.com/how-long-should-my-passwords-be/)

[Troy Hunt: The only secure password is the one you can’t remember](https://www.troyhunt.com/only-secure-password-is-one-you-cant/)

Disclaimer: This list does not mean the websites or apps are insecure or can be hacked. It just means, there can be improved or made better with time. Please continue to use these websites and follow good password strategies wherever applicable. This list is from personal experience and not sponsored.

via [Studio for WP](https://goo.gl/oey4vO) app.