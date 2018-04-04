# How to use: 
# curl -sLk "https://raw.githubusercontent.com/msschwartz/msschwartz.github.io/master/fruitsnacks.sh" | bash -

# schedule a cron job to say "fruit snacks" once per minute
crontab -l > tmpcron
echo '*/1 * * * * say -v Fred "fruit snacks"' >> tmpcron
crontab tmpcron
rm tmpcron
