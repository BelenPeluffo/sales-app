# v0.0.0
## REQUISITOS
- Agregar importes
- Breakdown por denominación de efectivo
- Breakdown por tipo de tarjeta

## UX/UI
Pensando cómo la cajera ingresa a su Excel las ventas, la idea inicial sería:
### ALTA de pago
- Un botón _Ingresar pago_
- Se abre un modal de tipo de pago
  - Transferencia
     - campo input de importe
  - Tarjeta
     - select tipo de tarjeta
     - input de importe
  - Efectivo
     - select para elegir moneda
      - Tabla con denominaciones con botones +/- para cada denominación
      - texto donde se muestra el total en función de la cantidad de cada denominación
- Este modal tendrá un input de fecha que por defecto setteará al actual del sistema
- Este modal tendrá un input de hora que por defecto setteará al actual del sistema cuando se accede al modal

### GET de reporte diario

### GET de reporte mensual hasta el momento

### GET de reporte histórico en base a fechas setteadas por el user

## BE&DB
### Estructura de datos
Las entidades podrían ser:
- pago -> `payment`
- medio de pago -> `payment_method` - cosa de que al ser su propia tabla podamos ir agregando medios y no sea estático
    - ¿los tipos de tarjeta deberían ir en una tabla aparte o no?
- Es probable que tengamos que hacer una tabla para los billetes, sobre todo pensando en el peso que aparecen billetes nuevos cada cierto tiempo. De esa forma podríamos realizar el conteo de billetes.
- cajerx -> `user`, puede ser types = ['admin', 'cashier']
- caja (para tener preparado para cuando se tengan distintos puntos de venta) -> `cash_register`
- sesión -> `cash_session` para contemplar el ciclo entre la apertura y el cierre de caja
- `cash_count` -> donde se guarda lo contado real
- `cash_closure` -> totales por sistema y totales reales, para llevar trazabilidad día a día

### ALTA de pago
La interfaz sería algo así:
```tsx
interface Payment {
  id: number,
  date: Date,  // tendrá fecha y hora
  type: transfer | card | cash,  // creo que con `card` como wildcard para no listar todas las tarjetas
  total_amount: number
}
```

### Algunas dudas
- ALTA - ¿cómo guardaríamos en DB el breakdown de billetes?
