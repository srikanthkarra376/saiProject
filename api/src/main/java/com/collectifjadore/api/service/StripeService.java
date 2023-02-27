package com.collectifjadore.api.service;

import com.stripe.exception.StripeException;


public interface StripeService {
    String checkout(String priceId, Long quantity) throws StripeException;
}
