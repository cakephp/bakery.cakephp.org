ifneq ($(shell which brew),)
	VIRTUALENV_PATH = $(HOME)/.virtualenvs/bakery
endif

ifdef WORKON_HOME
	VIRTUALENV_PATH = $(WORKON_HOME)/bakery
endif

ifndef VIRTUALENV_PATH
	VIRTUALENV_PATH = .virtualenv
endif
VIRTUALENV_BIN = $(VIRTUALENV_PATH)/bin

ifdef TRAVIS
	SUDO_PREFIX =
else
	SUDO_PREFIX = 'sudo'
endif

ifndef PORT
	PORT = 8100
endif

ifndef NUMBER_OF_HTTP_WORKERS
	NUMBER_OF_HTTP_WORKERS = 2
endif

ifndef TEST_NAME
	TEST_NAME =
endif

ifndef TEST_OPTIONS
	TEST_OPTIONS =
endif

BREW := $(shell which brew)
DEBIAN_FRONTEND = noninteractive
DEV_ENV = source $(VIRTUALENV_BIN)/activate ;
FAB = $(VIRTUALENV_BIN)/fab
GUNICORN = $(ENV) $(VIRTUALENV_BIN)/gunicorn
NOSE = $(VIRTUALENV_BIN)/nosetests
PIP = $(VIRTUALENV_BIN)/pip
PIP_VERSION = 8.0.3
PYCURL_SSL_LIBRARY = openssl
PYTHON = $(ENV) $(VIRTUALENV_BIN)/python
WHOAMI := $(shell whoami)

# If the first argument is "fab"...
ifeq (fab,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "fab"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

.PHONY: all
all: install

.PHONY: install
install: requirements venv

# Delete the virtualenv, and any ignored files
.PHONY: clean
 clean:
	rm -rf $(VIRTUALENV_PATH)
	git clean -fX

.PHONY: requirements
requirements:
ifeq ($(BREW),)
ifndef TRAVIS
	sudo apt-get -qq -y install libxml2-dev libxslt1-dev python-dev > /dev/null
endif
endif

.PHONY: venv
venv:
ifeq ($(BREW),)
ifndef TRAVIS
	sudo pip install pip==$(PIP_VERSION) > /dev/null
	sudo pip install virtualenv > /dev/null
endif
else
	which virtualenv || sudo pip install virtualenv > /dev/null
endif
	if [ ! -f $(PIP) ]; then virtualenv --distribute $(VIRTUALENV_PATH) > /dev/null; fi
	$(PIP) install --upgrade pip==$(PIP_VERSION) > /dev/null
	export PYCURL_SSL_LIBRARY=openssl && $(PIP) install -r requirements.txt > /dev/null

.PHONY: venv-activate
venv-activate:
	@echo "source $(VIRTUALENV_BIN)/activate"

.PHONY: tinker
tinker:
	$(VIRTUALENV_BIN)/tinker --build
