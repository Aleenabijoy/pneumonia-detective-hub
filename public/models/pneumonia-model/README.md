
# Pneumonia Detection Model

## Model Information

This directory should contain the TensorFlow.js model files for pneumonia detection:

- `model.json` - The model architecture and weights reference
- `*.bin` files - The model weights

## How to Export a CNN Model from Python to TensorFlow.js

If you've trained a CNN model in Python (TensorFlow/Keras), you can convert it for use in the browser:

1. Install the tensorflowjs converter:
   ```
   pip install tensorflowjs
   ```

2. Convert your model:
   ```python
   import tensorflowjs as tfjs
   
   # For a Keras model
   tfjs.converters.save_keras_model(model, './pneumonia-model')
   ```

3. Copy the resulting files to this directory.

## Expected Model Input/Output

- **Input**: Grayscale images of size 224x224x1
- **Output**: Binary classification (0 = Normal, 1 = Pneumonia)
