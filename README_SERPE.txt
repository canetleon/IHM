# Pour nouvelle installation
pip install -r requirements.txt
set FLASK_APP=run.py
set FLASK_ENV=development

# Pour lancer en local
python3 -m flask run

#Pour lancer sur son IP
python -m flask run --host=0.0.0.0

#Pour lancer sur une IP particulière
python -m flask run --host=169.254.212.241

#IP de la RASP
169.254.160.48

#GIT
git add .
git commit -m "modif faite du XX/XX"
git push -u origin main

#IP raspb
169.254.160.48