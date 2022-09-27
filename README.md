# test-firebase-api

## Pasos de instalación de vairables de entorno

### Correr los siguientes comandos en la terminal:

Development

```
firebase functions:config:set development.type="service_account"
firebase functions:config:set development.project_id="test-firebase-api-deb6a"
firebase functions:config:set development.private_key_id="c6cb5c87cfdf9ebcffa8f87ac149c41fab8bb5d1"
firebase functions:config:set development.private_key="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMWChxI7tUgKGe\nCR6WHYKZar4jHKRs3DUaj/gK85LIhvR33EFzHIiosd8ehENSRqTOFai9rDALAyly\n/xKAATEd8ysXZ6kj3fDdroVT+C1jhuuVA3hHPVlAOvCAjXCnbICi6eA7F6S78sew\n1VCpr/CA++VMAVImdxmrdRdKbVYYs7nZacCJWsaG1rofqnLHsK386RoYDlz5JBQY\nJ9f3OeysWGYUZYN9VdxQED4O6Fo9tRrKRrgWKK24m06q+VX6gH24S3z2+KRZKJ3I\nIP1xHmNUGLmo/18P6o70FETdBXCaKgUE6PYp85w7lRi1KmklPLgnmoLnZe3c4UhQ\n2dIOL3lfAgMBAAECggEAW+TJSxfmhnnSNF+lgZyDvrpiByg6STo+J1PXGBWxTLxj\n9AL46+tJCZPz4qVYIQfj1UmoOKPWdx1U5oIOr8HZdL6GAmB7j8WfLBHvo3NX9goW\np0yIKoFMQbY/sY/puWDx+FF0pR5c1qi3ZK6JN8YHQfoFg8iUSPgGczSU5MOGlFRv\n/H6L8Ghmgig7KrD9z3dCVoE93Y+Dvrc6tNz7eJlHePXwotPHRh9kXCtEu5S+8PHi\n3VwkbHNbfIIlCzBuNryM74b5OUuKEoAB3UqO/8COfQV6sXitn4pA3yua5Ss4rJzJ\nqnF8ZXrsrYl6rgUCzxKnAeffuZURBpIZ0hy7WKcZAQKBgQD7co8xW8LMb8Rd1Gsp\n43ct6QC5jdUmpZMGw4tip/gsZ1eGq5JY5sAL3pRU50quGLCXsRE4kEd+KTrZW7Mi\nZbyswv8rw/6rdHwaU48ZPv6OmpW4XDQQBODsV7HJm2sxCK9mfwieBOxqu2scL/CW\nUB7XU0c1ScRBxpufonKVRsq3pQKBgQDQC0dyI/dlSl216QWsZZIDte00E7JkEOZx\nSmYdSYR15Wh3yy8VPQZL5UHPPr49vtxQYKcq8uktef6acLh/9R+CvzOAuk0Neq8d\nvvR1wbGito8HfmFqEpzzIxYYKEFR/AdZzejm0OHKBsgS1LmJ1TVQHL5NmmS1BQLy\nBpknMLf9swKBgQDP4Kz7THZml3xLakLSVaiA/yHHRbfThI1hySYiAOXOp/0XbB7I\nerSI25HcA3+dIPJV5mBrV/STG7j4W7RkGqH6Xhehch7IVrwG88/ZOlgvQyPGUAwG\ntlHRcsqb926OEjUYUquoID/oGVv66LNJQaHNuJ6lMoAbNPwR5LZALU+ItQKBgDwr\n9vcZVfWS47W4du6c1fWCyd91DvSIOs5rkUtJNymON3/mYXDIHKkY3sbdQ9LCACCz\nQ8ZVSYHgtfXfQk2oDPwY5wGFYMHUSQ/WagghBIqmOIoXUH+IcKKV9E76XaIjvdCI\nkKMpqRRwj696nUszQl8wYQ466IO+tlJf/C3sllqnAoGBANcTpP559OfAGVLDuj+v\ndxpWnYK89CE/Kv+9g3wEiXaPfTyxoqY5cn/dPayLO0GtpIl/nTW6XhCxHO01m0AJ\nyH6oznkdiO5G13wjYEiumrYjzCnyJ5XpGrJq0ah1emZEvnhpwHrBUCe1gPGdbYid\n8YukdaMLdsBYRl9FnR+4VPpZ\n-----END PRIVATE KEY-----\n"
firebase functions:config:set development.client_email="firebase-adminsdk-8u5ds@test-firebase-api-deb6a.iam.gserviceaccount.com"
firebase functions:config:set development.client_id="105721715576318413038"
firebase functions:config:set development.auth_uri="https://accounts.google.com/o/oauth2/auth"
firebase functions:config:set development.token_uri="https://oauth2.googleapis.com/token"
firebase functions:config:set development.auth_provider_x509_cert_url="https://www.googleapis.com/oauth2/v1/certs"
firebase functions:config:set development.client_x509_cert_url="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8u5ds%40test-firebase-api-deb6a.iam.gserviceaccount.com"

```

### Obtener las variables de entorno

Mac,Linux => `firebase functions:config:get > .runtimeconfig.json`

Windows => `firebase functions:config:get | ac .runtimeconfig.json`

Mover el archivo `.runtimeconfig.json` dentro de la carpeta `functions`.

## Work on API
1. Correr el comando `npm install` en la terminal (dentro de la raíz del directorio)
```
npm install
cd functions
npm install
cd ..
```
2. Correr el comando `firebase serve` para iniciar el servidor.