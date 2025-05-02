FROM python:3.13-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000/tcp

# Run migrations and start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

# Use Gunicorn to serve the application in prod
# CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py migrate && gunicorn ecommerce_backend.wsgi:application --bind 0.0.0.0:8000"]
