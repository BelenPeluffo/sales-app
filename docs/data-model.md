# Modelo de Datos – Sistema de Caja

Modelo SQL definitivo orientado a:
- Control de caja por sesión
- Movimientos contables netos
- Flujo físico de efectivo (recibido y cambio)
- Subtipos de tarjeta
- Conteo físico y cierre formal

---

## 1. Entidades Base

### users
- id (PK)
- name
- email (unique)
- password_hash
- role (admin | cashier)
- is_active
- created_at

### cash_register
- id (PK)
- name
- is_active
- created_at

### cash_session
- id (PK)
- cash_register_id (FK)
- opened_by (FK users)
- opened_at
- closed_by (FK users)
- closed_at
- opening_amount
- status (open | closed)

---

## 2. Medios de Pago

### payment_method
- id (PK)
- name
- type (cash | card | digital)
- requires_instrument
- is_active
- created_at

### payment_instrument (subtipo de tarjeta)
- id (PK)
- payment_method_id (FK)
- name (ej: Visa Crédito)
- card_brand
- card_type (credit | debit)
- is_active

---

## 3. Movimientos

### movement (registro contable neto)
- id (PK)
- cash_session_id (FK)
- payment_method_id (FK)
- payment_instrument_id (FK nullable)
- movement_type (income | expense)
- amount (neto)
- notes
- created_by (FK users)
- created_at

---

## 4. Efectivo – Flujo Físico

### cash_denomination
- id (PK)
- value
- currency
- is_active
- created_at

### movement_cash_flow
- id (PK)
- movement_id (FK)
- flow_type (received | change)
- denomination_id (FK)
- quantity

**Validación lógica:**

received_total − change_total = movement.amount

---

## 5. Conteo Físico al Cierre

### cash_count
- id (PK)
- cash_session_id (FK)
- payment_method_id (FK)
- counted_total
- created_by (FK users)
- created_at

### cash_count_detail (solo efectivo)
- id (PK)
- cash_count_id (FK)
- denomination_id (FK)
- quantity

---

## 6. Cierre Formal

### cash_closure
- id (PK)
- cash_session_id (FK unique)
- total_income
- total_expense
- expected_total
- counted_total
- difference
- closed_by (FK users)
- closed_at

---

# Principios del Modelo

- `movement` guarda el resultado contable neto.
- `movement_cash_flow` guarda el flujo físico real.
- El cierre compara sistema vs conteo físico.
- Separación clara entre lógica contable y composición física.
- Escalable a múltiples cajas y usuarios.