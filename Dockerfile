# 가져올 이미지 정의
FROM node:alpine AS builder
# 경로 설정
WORKDIR /usr/src/app
# 복사
COPY package.json .
# 명령어 실행 (의존성 설치)
RUN npm install
# 현재 디렉토리의 모든 파일을 컨테이너의 워킹 디렉토리에 복사.
COPY ./ ./
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html