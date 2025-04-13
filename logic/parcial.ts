/**
 * Interfaz que define la estructura de un Usuario
 * @property {string} nombre - Nombre del usuario
 * @property {number} edad - Edad del usuario
 * @property {string} email - Correo electrónico del usuario
 * @property {boolean} activo - Estado de actividad del usuario (true/false)
 * @property {"usuario" | "admin"} rol - Rol del usuario (usuario normal o admin)
 */
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
  rol: "usuario" | "admin";
}

/**
 * Interfaz que define la estructura de un Producto
 * @property {string} nombre - Nombre del producto
 * @property {number} precio - Precio base del producto
 * @property {number} stock - Cantidad disponible en inventario
 * @property {string} categoria - Categoría del producto
 * @property {number} descuento - Porcentaje de descuento (0-20%)
 * @property {Function} calcularPrecioFinal - Método para calcular precio con descuento
 * @property {Function} actualizarStock - Método para actualizar el inventario
 */
interface Producto {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  descuento: number;
  calcularPrecioFinal: () => number;
  actualizarStock: (cantidad: number) => void;
}

/**
 * Clase que implementa la interfaz Producto
 */
class ProductoImplementado implements Producto {
  /**
   * Constructor de la clase Producto
   * @param {string} nombre - Nombre del producto
   * @param {number} precio - Precio base
   * @param {number} stock - Cantidad inicial en inventario
   * @param {string} categoria - Categoría del producto
   * @param {number} descuento - Descuento aleatorio entre 0% y 20% por defecto
   */
  constructor(
    public nombre: string,
    public precio: number,
    public stock: number,
    public categoria: string,
    public descuento: number = Math.floor(Math.random() * 21)
  ) {}

  /**
   * Calcula el precio final aplicando el descuento
   * @returns {number} Precio con descuento aplicado
   */
  calcularPrecioFinal = (): number => {
    return this.precio * (1 - this.descuento / 100);
  };

  /**
   * Actualiza el stock del producto
   * @param {number} cantidad - Cantidad a descontar del inventario
   * @throws {Error} Si no hay suficiente stock disponible
   */
  actualizarStock = (cantidad: number): void => {
    if (this.stock <= 0) {
      throw new Error(`El producto ${this.nombre} está agotado`);
    }
    if (this.stock >= cantidad) {
      this.stock -= cantidad;
    } else {
      throw new Error(`No hay suficiente stock para ${this.nombre}`);
    }
  };
}

/**
 * Muestra un mensaje de error en color rojo y termina la ejecución
 * @param {string} mensaje - Mensaje de error a mostrar
 * @returns {never} - Finaliza el proceso
 */
const mostrarErrorYSalir = (mensaje: string): never => {
  console.error('\x1b[31m%s\x1b[0m', mensaje); // \x1b[31m = color rojo
  process.exit(1);
};

/**
 * Crea un nuevo usuario con estado activo aleatorio (80% probabilidad de activo)
 * @param {string} nombre - Nombre del usuario
 * @param {number} edad - Edad del usuario
 * @param {string} email - Correo electrónico
 * @param {"usuario" | "admin"} rol - Rol del usuario
 * @returns {Usuario} Objeto usuario creado
 */
const crearUsuario = (
  nombre: string,
  edad: number,
  email: string,
  rol: "usuario" | "admin"
): Usuario => {
  const activo = Math.random() < 0.8; // 80% probabilidad de true
  return {
    nombre,
    edad,
    email,
    activo,
    rol,
  };
};

/**
 * Crea un nuevo producto con descuento aleatorio
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio base
 * @param {string} categoria - Categoría del producto
 * @param {number} stock - Cantidad inicial en inventario
 * @returns {Producto} Objeto producto creado
 */
const crearProducto = (
  nombre: string,
  precio: number,
  categoria: string,
  stock: number
): Producto => {
  return new ProductoImplementado(nombre, precio, stock, categoria);
};

/**
 * Genera un mensaje de resumen de compra con formato
 * @param {Usuario} usuario - Usuario que realiza la compra
 * @param {Array} productosComprados - Lista de productos comprados
 * @returns {string} Mensaje formateado con resumen de compra
 */
const generarMensajeCompra = (
  usuario: Usuario,
  productosComprados: { producto: Producto; cantidad: number }[]
): string => {
  // Formatea la información de cada producto comprado
  const productosInfo = productosComprados
    .map(
      (item) =>
        `- ${item.producto.nombre}: ${item.cantidad} unidad(es) - $${(
          item.producto.calcularPrecioFinal() * item.cantidad
        ).toFixed(2)} (${item.producto.descuento}% descuento)`
    )
    .join("\n");

  // Calcula el total de la compra
  const total = productosComprados.reduce(
    (sum, item) => sum + item.producto.calcularPrecioFinal() * item.cantidad,
    0
  );

  // Retorna el mensaje completo formateado
  return `
=== RESUMEN DE COMPRA ===
Usuario: ${usuario.nombre} (${usuario.email})
Rol: ${usuario.rol}
Estado: ${usuario.activo ? "Activo" : "Inactivo"}
Productos comprados:
${productosInfo}

Total a pagar: $${total.toFixed(2)}
`;
};

/**
 * Simula el proceso de compra con un retraso de 2 segundos
 * @param {Usuario} usuario - Usuario que realiza la compra
 * @param {Producto[]} productos - Lista de productos a comprar
 * @param {number[]} cantidades - Cantidades correspondientes a cada producto
 * @returns {Promise<string>} Promesa que resuelve con el resumen de compra
 * @throws {Error} Si el usuario está inactivo o no hay stock suficiente
 */
const simularCompra = (
  usuario: Usuario,
  productos: Producto[],
  cantidades: number[]
): Promise<string> => {
  // Verifica si el usuario está activo
  if (!usuario.activo) {
    mostrarErrorYSalir("Usuario inactivo - La compra no puede realizarse");
  }

  console.log("\nProcesando compra...\n");

  return new Promise((resolver, rechazar) => {
    setTimeout(() => {
      try {
        // Valida que coincidan productos y cantidades
        if (productos.length !== cantidades.length) {
          throw new Error(
            "La cantidad de productos no coincide con las cantidades especificadas"
          );
        }

        const productosComprados: { producto: Producto; cantidad: number }[] = [];
        const productosAgotados: string[] = [];

        // Procesa cada producto
        productos.forEach((producto, index) => {
          const cantidad = cantidades[index];
          try {
            producto.actualizarStock(cantidad);
            productosComprados.push({ producto, cantidad });
          } catch (error) {
            productosAgotados.push(
              `${producto.nombre} (solicitados: ${cantidad}, disponibles: ${producto.stock})`
            );
          }
        });

        // Verifica que al menos un producto pudo comprarse
        if (productosComprados.length === 0) {
          throw new Error(
            "Ninguno de los productos seleccionados tiene stock disponible"
          );
        }

        // Genera el mensaje de resumen
        let mensaje = generarMensajeCompra(usuario, productosComprados);

        // Agrega productos agotados si los hay
        if (productosAgotados.length > 0) {
          mensaje += `\n\nProductos no disponibles:\n${productosAgotados.join(
            "\n"
          )}`;
        }

        resolver(mensaje);
      } catch (error) {
        rechazar(error);
      }
    }, 2000);
  });
};

// ============ EJEMPLO DE USO ============

// Crear un usuario (80% probabilidad de estar activo)
const usuario = crearUsuario("Ana", 28, "ana@example.com", "usuario");

// Lista de productos disponibles
const productos = [
  crearProducto("Laptop", 1200, "Electrónicos", 5),
  crearProducto("Mouse", 25, "Accesorios", 10),
  crearProducto("Teclado", 50, "Accesorios", 0),
  crearProducto("Monitor", 300, "Electrónicos", 3)
];

// Cantidades a comprar de cada producto
const cantidades = [1, 2, 1, 1];

// Mostrar información del usuario
console.log(`Usuario: ${usuario.nombre}, Email: ${usuario.email}, Rol: ${usuario.rol}, Estado: ${usuario.activo ? "Activo" : "Inactivo"}`);

// Mostrar lista de productos disponibles
console.log("\n=== LISTA DE PRODUCTOS ===");
productos.forEach((producto, index) => {
  console.log(
    `${index + 1}. ${producto.nombre}: $${producto
      .calcularPrecioFinal()
      .toFixed(2)} (${producto.descuento}% descuento) - Stock: ${
      producto.stock
    }`
  );
});

// Simular el proceso de compra
simularCompra(usuario, productos, cantidades)
  .then(console.log) // Muestra el resumen si tiene éxito
  .catch(console.error); // Muestra errores si falla