package com.collectifjadore.api.controllers;

import com.collectifjadore.api.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@RestController
@RequestMapping(value = "/api3")
public class StripeController {
    @Autowired
    StripeService stripeService;
    @PostMapping("/checkout")
    /**
     * Payment with Stripe checkout page
     *
     * @throws StripeException
     */
    public String checkout(@RequestParam("priceId") String priceId, @RequestParam("quantity") Long quantity) throws StripeException {
        return stripeService.checkout(priceId,quantity);
    }
}
