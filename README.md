
# File-Mailer By StudySync

This service focusses on sending the required files that you code in your lab directly to your E-Mail Id.




## Why is it needed

 - In most of the colleges there are DL (Desktop Labs) where they force you to code in their environment instead of your laptops.
 - In order to get what you had coded you have to either take pictures or login your E-Mail Id and mail it to your self or Get a pendrive.
 - In order to save you from all of these hassles and problems we present you the File-Mailer by StudySync.

## Demo

[File-Mailer Preview - https://mailer.adityachoudhury.com](https://mailer.adityachoudhury.com)


## Deployment

To deploy this project run

```bash
  npm install
  npm run serve
```


## API Reference

#### Get all items

```http
  POST /email/send
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `emailId` | `email` | **Required**. Your Email-Id |
| `files` | `multipart` | **Required**.Files to mail |

 **Note**:- For now the supported files are .c , .cpp , .py , .java
 
Further this can be added to support a lot of files.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_PORT`
- `PORT`


## Authors

- [@theadityachoudhury](https://www.github.com/theadityachoudhury)

