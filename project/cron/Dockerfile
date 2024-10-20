FROM alpine:3.12

RUN apk add --no-cache curl bash

WORKDIR /app

COPY createTodo.sh .

RUN chmod +x createTodo.sh

CMD ["./createTodo.sh"]

