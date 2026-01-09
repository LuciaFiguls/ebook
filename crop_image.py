#!/usr/bin/env python3
from PIL import Image
import sys

def crop_transparent(image_path, output_path):
    """Recorta el fondo transparente de una imagen PNG"""
    try:
        # Abrir la imagen
        img = Image.open(image_path)

        # Convertir a RGBA si no lo es
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Obtener el bounding box del contenido (sin transparencia)
        bbox = img.getbbox()

        if bbox:
            # Recortar la imagen
            cropped = img.crop(bbox)

            # Guardar la imagen recortada
            cropped.save(output_path, 'PNG')

            print(f"✓ Imagen recortada exitosamente")
            print(f"  Original: {img.size}")
            print(f"  Recortada: {cropped.size}")
            print(f"  Guardada en: {output_path}")
            return True
        else:
            print("✗ No se pudo encontrar contenido en la imagen")
            return False

    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    input_path = "images/ebook caso de exito.png"
    output_path = "images/ebook caso de exito.png"  # Sobreescribir el original

    crop_transparent(input_path, output_path)
