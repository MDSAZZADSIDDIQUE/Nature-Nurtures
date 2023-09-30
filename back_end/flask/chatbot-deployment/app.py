from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np

from chat import get_response

app = Flask(__name__)
CORS(app)


@app.route("/api/predictchat", methods=["POST"])
def predictChat():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    response = jsonify(message)

    return response


def predict(model, img_path, image_height, image_width):
    img = tf.keras.preprocessing.image.load_img(
        img_path, target_size=(image_height, image_width))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * np.max(predictions[0]), 2)

    return predicted_class, confidence


class_names = ['Blight', 'Common_Rust', 'Gray_Leaf_Spot', 'Healthy']
loaded_model = tf.keras.models.load_model('working/model_1')


@app.route('/api/predictdisease', methods=['POST'])
def prediction_endpoint():
    image = request.files['image']

    img_path = 'working/temporarily.jpg'
    image.save(img_path)

    image_height = 256
    image_width = 256

    predicted_class, confidence = predict(
        loaded_model, img_path, image_height, image_width)

    return jsonify({'class': predicted_class, 'confidence': confidence})


if __name__ == "__main__":
    app.run(debug=True, port=8080)
