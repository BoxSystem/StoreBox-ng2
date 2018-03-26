FROM nginx:alpine
LABEL creater="sam5372@foxmail.com" description="Stroebox-angular-web" version="1.0"

#复制所有文件到
COPY ./dist /usr/share/nginx/html

EXPOSE 80
