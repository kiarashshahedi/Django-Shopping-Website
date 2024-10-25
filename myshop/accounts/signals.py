from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, SellerProfile

@receiver(post_save, sender=User)
def create_seller_profile(sender, instance, created, **kwargs):
    if created and instance.is_seller:
        SellerProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_seller_profile(sender, instance, **kwargs):
    if instance.is_seller:
        instance.seller_profile.save()
