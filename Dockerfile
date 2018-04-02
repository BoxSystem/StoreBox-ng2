FROM nginx:alpine
LABEL creator="sam5372@foxmail.com" contributor="AryloYeung<arylo.open@gmail.com>" description="Stroebox-angular-web" version="1.0.1"

COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf

#复制所有文件到
COPY ./dist /usr/share/nginx/html

EXPOSE 80
