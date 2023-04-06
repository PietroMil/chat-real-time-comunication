# chat-real-time-comunication
## Docker 

Run on terminal

```
docker run --name chat -e POSTGRES_USER=pietro -e POSTGRES_DB=chat -e POSTGRES_PASSWORD=pietro -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```