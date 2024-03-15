from flask import Flask, jsonify, send_file
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # ใส่บรรทัดนี้เพื่อเปิดใช้งาน CORS

# โฟลเดอร์ที่เก็บรูปภาพ
image_folder = "B:\\RestfullApi\\สำรอง\\New folder\\ปรับ css\\เพิ่ม flask\\New folder\\GG-React-API\\server\\upload"

# ตั้งค่าที่อยู่ URL สำหรับ API
api_prefix = "/api"

@app.route(f"{api_prefix}/images", methods=["GET"])
def get_images():
    # ดึงรายชื่อไฟล์ภาพทั้งหมดในโฟลเดอร์
    image_files = os.listdir(image_folder)

    # สร้างลิสต์ของข้อมูลรูปภาพ
    images_data = []
    for image_file in image_files:
        image_url = f"{api_prefix}/images/{image_file}"
        images_data.append({"name": image_file, "imageUrl": image_url})

    return jsonify(images_data)

@app.route(f"{api_prefix}/images/<image_name>", methods=["GET"])
def get_image(image_name):
    # ตรวจสอบว่าไฟล์ภาพมีอยู่หรือไม่
    image_path = os.path.join(image_folder, image_name)
    if image_name in os.listdir(image_folder) and os.path.isfile(image_path):
        # ส่งไฟล์ภาพกลับ
        return send_file(image_path, mimetype='image/jpeg')
    else:
        return jsonify({"error": "Image not found"}), 404

if __name__ == "__main__":
    # รันแอปพลิเคชัน Flask
    app.run(debug=True)