from rest_framework.views import APIView
from rest_framework.response import Response
from PIL import Image
from django.http import HttpResponse
from ultralytics import YOLO
import io
import os
import uuid

class DetectView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Load the model
        self.model = YOLO("/Users/mintesnotebanksirabiza/Desktop/finalYearProject/best.pt")

    def post(self, request, *args, **kwargs):
        # Get the image from the request
        image2 = request.FILES['image']

        # Generate a unique filename for the image
        image_filename = f'{uuid.uuid4()}.jpg'

        # Convert .webp to .jpg if necessary
        if image2.name.endswith('.webp'):
            image = Image.open(image2)
            image = image.convert('RGB')
            image.save(image_filename, 'jpeg')
        else:
            # Save the image to a file in the current directory
            with open(image_filename, 'wb+') as destination:
                for chunk in image2.chunks():
                    destination.write(chunk)

        # Run inference on the image and save the result
        result = self.model.predict(image_filename, save=True, imgsz=320, conf=0.25)
        names = {0: 'dry', 1: 'over-ripe', 2: 'ripe', 3: 'semiripe', 4: 'unripe'}
        
        count_dry = 0
        count_over = 0
        count_ripe = 0
        count_semi = 0
        conunt_unripe = 0
        for results in result:
            
            boxes = results.boxes
            cls = list(boxes.cls)
            keypoints = results.keypoints
            masks = results.masks
            
            print(f'cls:{cls}')
            
        for clas in cls :
            
            
            if clas == 0.0 :
                
                count_dry += 1
            elif clas == 1.0:
                
                count_over += 1
            elif clas == 2.0:
                
                count_ripe += 1
            elif clas == 3.0:
                
                count_semi += 1
            elif clas == 4.0:
                
                conunt_unripe += 1
        message = f'There are {count_dry} dry,{count_over} over-ripe,{count_ripe} ripe,{count_semi} semi-ripe and {conunt_unripe} unripe cherries'
        print(message) 
        save_dir = result[0].save_dir
        save_dir = f'{save_dir}/{image_filename}'
        print(save_dir)
        # Open the saved image file
        with open(save_dir, 'rb') as f:
            image_data = f.read()

        # Delete the temporary image file
        os.remove(image_filename)

        # Return the image data in the HTTP response
        return HttpResponse(image_data, content_type="image/jpg")
    
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
import logging

logger = logging.getLogger(__name__)

class CustomLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        username = request.data.get('username')
        print(username)
        password = request.data.get('password')
        print(password)
        logger.debug(f'Username: {username}')
        logger.debug(f'Password: {password}')

        if not username or not password:
            return Response({"detail": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        logger.debug(f'Authenticated user: {user}')

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

from PIL import Image
import numpy as np
import io
import tensorflow as tf
from rest_framework.views import APIView
from rest_framework.response import Response

class CoffeeDiseaseClassificationView(APIView):
    def post(self, request, format=None):
        class_names= ['miner', 'nodisease', 'phoma', 'rust']
        image = request.data['image']  # Extract the image from the request data

        # Read the image data into bytes
        image_bytes = image.read()

        # Convert the image to PIL format, convert it to RGB, and resize it to the size your model expects
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB').resize((256, 256))

        # Convert the image to numpy array, normalize it, and convert it to float32
        image = np.array(image, dtype=np.float32) / 255.0

        # Add an extra dimension to match the input shape your model expects
        image = np.expand_dims(image, axis=0)

        # Load your model
        interpreter = tf.lite.Interpreter(model_path='/Users/mintesnotebanksirabiza/Desktop/web/model.tflite')
        interpreter.allocate_tensors()

        # Get input and output tensors.
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        # Pass the image to your model
        interpreter.set_tensor(input_details[0]['index'], image)
        interpreter.invoke()

        # Get the classification result
        result = interpreter.get_tensor(output_details[0]['index'])

        # Get the predicted label and confidence
        predicted_label = class_names[np.argmax(result)]
        confidence = round(100 * (np.max(result)), 2)

        # Return the predicted label and confidence in the HTTP response
        return Response({'predicted_label': predicted_label, 'confidence': confidence})