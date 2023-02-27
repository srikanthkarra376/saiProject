package com.collectifjadore.api.service.impl;

import com.collectifjadore.api.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeServiceImpl implements StripeService {
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }
    @Override
    public String checkout(String priceId, Long quantity) throws StripeException {
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:4200/secure/success")
                        .setCancelUrl("http://localhost:4200/secure/cancel")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(quantity)
                                        .setPrice(priceId)
                                        .build())
                        .build();
        Session session = Session.create(params);

        return session.getUrl();
    }
}
