from flask import Flask, render_template, request
import qrcode
from io import BytesIO
from base64 import b64encode

app= Flask(__name__)

@app.route('/')
def home():
    return render_template('form.html')

@app.route('/', methods=['POST'])
def generateQR():
    if(request.method == 'POST'):
        memory=BytesIO()
        data=request.form.get('link')
        if data:
            img = qrcode.make(data)
            img.save(memory)
            memory.seek(0)
            base64_img= "data:image/png;base64," + \
                b64encode(memory.getvalue()).decode('ascii')
            return render_template('form.html', data=base64_img)
        else:
            return render_template('form.html', error="Please provide a valid URL.")
    return render_template('form.html')
if __name__ == '__main__':
    app.run(debug=True)