# Use a multi-stage build to generate the site with python
# and serve the generated HTML with nginx
FROM python:3.9-alpine as builder

LABEL Description="Create an image to deploy bakery.cakephp.org"

# If we need to publish PDFs for plugins also install
# Add texlive-latex-recommended texlive-latex-extra for PDF support
# texlive-fonts-recommended
# texlive-lang-all
# latexmk
RUN apk add --update \
  git \
  make

COPY . /data/bakery

WORKDIR /data/bakery

RUN cd /data/bakery \
 && pip install -r requirements.txt

RUN tinker --build

# Build a small nginx container with just the static site in it.
FROM nginx:1.25-alpine as runtime

COPY --from=builder /data/bakery/blog/html/ /usr/share/nginx/html/
COPY --from=builder /data/bakery/nginx.conf /etc/nginx/conf.d/default.conf
