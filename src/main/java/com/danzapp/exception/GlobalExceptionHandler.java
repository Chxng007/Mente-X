package com.danzapp.exception;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.danzapp.dto.ApiError;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(BadCredentialsException ex, WebRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos.", request);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiError> handleDisabled(DisabledException ex, WebRequest request) {
        return buildResponse(HttpStatus.FORBIDDEN, "Esta cuenta está deshabilitada.", request);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiError> handleAuthentication(AuthenticationException ex, WebRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "No se pudo autenticar. Verifica tus credenciales.", request);
    }

    // Cubre, por ahora, casos como "Error: Email is already in use!" de
    // AuthService.
    // Cuando crezca el dominio, conviene reemplazar esto por excepciones propias
    // (ej. EmailAlreadyExistsException) para no atrapar errores de programación
    // como si fueran de negocio.
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntime(RuntimeException ex, WebRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    private ResponseEntity<ApiError> buildResponse(HttpStatus status, String message, WebRequest request) {
        ApiError body = ApiError.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .path(request.getDescription(false).replace("uri=", ""))
                .build();

        return ResponseEntity.status(status).body(body);
    }
}