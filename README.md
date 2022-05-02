# Tinkerer based bakery

## Requirements

http://tinkerer.me/

## Installation

To install the requirements for tinkerer, use virtualenv and pip:

```bash
cd /path/to/bakery
virtualenv env
. env/bin/activate
pip install -r requirements.txt
```

## Usage

Clone this repo and run the following command in the project folder:

```bash
tinker --build
```

## Adding an article

1. Create a directory for the month and day you are publishing on if
   one does not already exist.
2. Create the file for your post including metadata at the bottom.
3. Update `master.rst` to include your new post.
4. Push to GitHub.
5. Wait for GitHub Actions to deploy the article to bakery.cakephp.org
