# Use a multi-stage build to generate the site with python
# and serve the generated HTML with nginx
FROM python:3.10-alpine as builder

LABEL Description="Create an image to deploy bakery.cakephp.org"

# If we need to publish PDFs for plugins also install
# Add texlive-latex-recommended texlive-latex-extra for PDF support
# texlive-fonts-recommended
# texlive-lang-all
# latexmk
RUN apk add --update \
  git \
  make \
  nginx

COPY . /data/bakery

WORKDIR /data/bakery

RUN cd /data/bakery \
 && pip install -r requirements.txt

RUN tinker --build

RUN mv /data/bakery/blog/html/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
