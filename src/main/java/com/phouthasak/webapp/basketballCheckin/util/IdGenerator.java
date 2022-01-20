package com.phouthasak.webapp.basketballCheckin.util;

import org.apache.commons.codec.binary.Base64;

import java.nio.ByteBuffer;
import java.util.UUID;

public class IdGenerator {
    public static String uuidBase64UrlSafe() {
        byte[] data = toByteArray(UUID.randomUUID());
        String s = Base64.encodeBase64URLSafeString(data);
        return s.split("=")[0];
    }

    private static byte[] toByteArray(UUID uuid) {
        ByteBuffer bytes = ByteBuffer.wrap(new byte[16]);
        bytes.putLong(uuid.getMostSignificantBits());
        bytes.putLong(uuid.getLeastSignificantBits());
        return bytes.array();
    }
}
