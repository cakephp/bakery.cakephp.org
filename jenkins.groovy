def final REPO_NAME = 'cakephp/bakery'

job('Bakery - Rebuild and deploy') {
  description('''\
  Rebuild and deploy the bakery
  ''')
  scm {
    github(REPO_NAME, 'master')
  }
  triggers {
    githubPush()
  }
  logRotator {
    daysToKeep(30)
  }
  steps {
    shell('''
rm -rf /tmp/bakery-$GIT_COMMIT
git clone . /tmp/bakery-$GIT_COMMIT
cd /tmp/bakery-$GIT_COMMIT

git remote rm origin
git branch -D master || true
git checkout -b master

git remote | grep dokku || git remote add dokku dokku@104.239.163.8:bakery
git push -fv dokku master
rm -rf /tmp/bakery-$GIT_COMMIT
    ''')
  }
}
