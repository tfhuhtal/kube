FROM alpine:3.12

RUN apk add --no-cache curl bash

WORKDIR /app

COPY createBackup.sh .

RUN chmod +x createBackup.sh

CMD ["./createBackup.sh"]
