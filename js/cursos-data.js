export const cursosData = {
  java: {
    id: 'java',
    titulo: 'Introducción a Java',
    precio: '25.000',
    horas: 40,
    imagen: '/img/curso-java.png',
    descripcion: [
      'Este curso ofrece una introducción completa al lenguaje de programación Java, enfocándose en los conceptos básicos de la programación orientada a objetos.',
      'Aprenderás a crear aplicaciones simples, comprender la estructura de un programa Java, y trabajar con variables, tipos de datos, control de flujo y métodos.',
      'Ideal para principiantes sin experiencia previa en programación.'
    ],
    requisitos: [
      'Conocimientos básicos de computación.',
      'Tener instalado Java Development Kit (JDK).',
      'Instalar un IDE como IntelliJ IDEA o Eclipse.',
      'Ganas de aprender programación.'
    ],
    contenidos: [
      {
        titulo: 'Introducción',
        temas: [
          'Presentación del lenguaje Java y sus principales usos.',
          'Instalación y configuración del entorno de desarrollo (JDK e IDE).',
          'Primer programa en Java: estructura básica y ejecución.'
        ]
      },
      {
        titulo: 'Unidad N°1',
        temas: [
          'Variables, constantes y tipos de datos primitivos.',
          'Operadores aritméticos, lógicos y relacionales.',
          'Entrada y salida de datos en consola.'
        ]
      },
      {
        titulo: 'Unidad N°2',
        temas: [
          'Estructuras condicionales: if, else, switch.',
          'Bucles e iteraciones: for, while, do-while.',
          'Uso de sentencias de control: break y continue.'
        ]
      },
      {
        titulo: 'Unidad N°3',
        temas: [
          'Clases, objetos y métodos en Java.',
          'Encapsulamiento: atributos privados y métodos públicos.',
          'Constructores y sobrecarga de métodos.'
        ]
      }
    ],
    docente: {
      nombre: 'James Gosling',
      foto: '/img/docente-java-foto.jpg',
      calificacion: '/img/docente-calificacion-cuatro-estrellas.png',
      descripcion: [
        'Conocido como el "Padre de Java", James Gosling es el creador del lenguaje y un referente mundial en programación orientada a objetos. Con más de 30 años de experiencia, ha trabajado en proyectos clave de Sun Microsystems, Google y Amazon.',
        'Su dominio de Java y su habilidad para explicar conceptos complejos lo convierten en el docente ideal para este curso.'
      ]
    },
    cursosRelacionados: ['python', 'sql', 'javascript', 'testing']
  },
  
  javascript: {
    id: 'javascript',
    titulo: 'Fundamentos de JS',
    precio: '40.000',
    horas: 50,
    imagen: '/img/curso-intensivo-js.jpg',
    descripcion: [
      'Este curso brinda una introducción completa al lenguaje de programación JavaScript, cubriendo los fundamentos esenciales para el desarrollo web.',
      'Aprenderás a crear aplicaciones simples, comprender la estructura de un programa Java, y trabajar con variables, tipos de datos, control de flujo y métodos.',
      'Ideal para principiantes que quieran iniciarse en la programación y el desarrollo web.'
    ],
    requisitos: [
      'Conocimientos básicos de navegación web y uso de un navegador.',
      'Familiaridad con conceptos básicos de programación (variables, condicionales, bucles).',
      'Conocimientos elementales de HTML y CSS.',
      'Manejo básico de un editor de código (por ejemplo, VS Code).'
    ],
    contenidos: [
      {
        titulo: 'Introducción',
        temas: [
          'Presentación de JavaScript: historia, características y ámbitos de uso (web, backend con Node.js, aplicaciones híbridas, etc.).',
          'Instalación y configuración del entorno de desarrollo (navegador, Node.js, editor de código).',
          'Primer programa en JavaScript: estructura básica, ejecución en consola y en navegador.'
        ]
      },
      {
        titulo: 'Unidad N°1',
        temas: [
          'Variables y constantes: var, let, const y su alcance (scope).',
          'Tipos de datos primitivos y no primitivos: string, number, boolean, null, undefined, object, array.',
          'Operadores: aritméticos, lógicos, relacionales, ternario y operadores especiales (typeof, instanceof).'
        ]
      },
      {
        titulo: 'Unidad N°2',
        temas: [
          'Estructuras condicionales: if, else, switch.',
          'Bucles: for, while, do-while, for...in, for...of.',
          'Funciones: declaración, expresión, arrow functions, parámetros y valores por defecto.'
        ]
      },
      {
        titulo: 'Unidad N°3',
        temas: [
          'Objetos: creación, acceso a propiedades, métodos y destructuring.',
          'Arrays: métodos comunes (map, filter, reduce, find, forEach), spread operator y destructuring.',
          'Manejo de errores: try, catch, finally, y buenas prácticas de depuración.'
        ]
      }
    ],
    docente: {
      nombre: 'Brendan Eich',
      foto: '/img/docente-javascript-foto.jpg',
      calificacion: '/img/docente-calificacion-cinco-estrellas.png',
      descripcion: [
        'Conocido como el creador de JavaScript, Brendan Eich es un referente mundial en desarrollo web y estándares de programación. Con más de 30 años de experiencia, ha trabajado en Mozilla y ha influido profundamente en la evolución del lenguaje.',
        'Su claridad para explicar conceptos y su pasión por la enseñanza lo convierten en un docente excepcional para este curso de JavaScript.'
      ]
    },
    cursosRelacionados: ['java', 'python', 'sql', 'testing']
  },
  
  python: {
    id: 'python',
    titulo: 'Introducción a Python',
    precio: '30.000',
    horas: 45,
    imagen: '/img/curso-aprende-python.jpg',
    descripcion: [
      'Este curso ofrece una introducción completa al lenguaje de programación Python, enfocándose en los conceptos esenciales para comenzar a programar.',
      'Aprenderás la sintaxis básica, trabajar con variables, tipos de datos, estructuras de control y funciones, y desarrollar pequeños programas prácticos.',
      'Ideal para principiantes sin experiencia previa en programación que quieran iniciarse en Python.'
    ],
    requisitos: [
      'Conocimientos básicos de uso de computadora e internet.',
      'Familiaridad con conceptos elementales de informática.',
      'Ganas de aprender programación desde cero.',
      'Instalación previa de Python y un editor de código (por ejemplo, VS Code o PyCharm).'
    ],
    contenidos: [
      {
        titulo: 'Introducción',
        temas: [
          'Presentación de Python: características, historia y aplicaciones.',
          'Instalación y configuración del entorno (Python + IDE).',
          'Primer programa: estructura básica y ejecución.'
        ]
      },
      {
        titulo: 'Unidad N°1',
        temas: [
          'Variables, tipos de datos y constantes.',
          'Operadores aritméticos, lógicos y relacionales.',
          'Entrada y salida de datos.'
        ]
      },
      {
        titulo: 'Unidad N°2',
        temas: [
          'Sentencias condicionales (if, else, elif).',
          'Bucles (for, while).',
          'Control de flujo: break, continue y pass.'
        ]
      },
      {
        titulo: 'Unidad N°3',
        temas: [
          'Definición y uso de funciones.',
          'Parámetros, argumentos y valores de retorno.',
          'Importación y uso de módulos estándar.'
        ]
      }
    ],
    docente: {
      nombre: 'Guido van Rossum',
      foto: '/img/docente-python-foto.png',
      calificacion: '/img/docente-calificacion-cinco-estrellas.png',
      descripcion: [
        'Conocido como el "Padre de Python", Guido van Rossum es el creador de este lenguaje y un referente mundial en programación. Con más de 35 años de experiencia, ha trabajado en proyectos clave de Google, Dropbox y Microsoft.',
        'Su claridad para explicar conceptos complejos y su pasión por la enseñanza lo convierten en un docente excepcional para este curso.'
      ]
    },
    cursosRelacionados: ['java', 'sql', 'javascript', 'testing']
  },
  
  sql: {
    id: 'sql',
    titulo: 'SQL Avanzado',
    precio: '45.000',
    horas: 60,
    imagen: '/img/curso-sql-avanzado.png',
    descripcion: [
      'Este curso ofrece una formación avanzada en SQL, enfocándose en técnicas y herramientas para trabajar con bases de datos complejas.',
      'Aprenderás a optimizar consultas, manejar subconsultas, operaciones avanzadas de JOIN, CTEs, índices, vistas y procedimientos almacenados.',
      'Ideal para desarrolladores, analistas de datos o administradores de bases de datos que busquen mejorar su dominio de SQL.'
    ],
    requisitos: [
      'Conocimientos básicos de SQL y manejo de bases de datos.',
      'Experiencia en escritura de consultas SELECT, INSERT, UPDATE y DELETE.',
      'Familiaridad con conceptos de normalización y diseño de bases de datos.',
      'Acceso a un gestor de base de datos como MySQL, PostgreSQL, SQL Server u Oracle.'
    ],
    contenidos: [
      {
        titulo: 'Introducción',
        temas: [
          'Presentación de SQL avanzado: importancia en bases de datos, optimización y análisis de datos complejos.',
          'Instalación y configuración de un entorno de base de datos (MySQL, PostgreSQL, SQL Server, Oracle).',
          'Herramientas para desarrollo SQL: uso de clientes SQL, IDEs especializados y herramientas gráficas.'
        ]
      },
      {
        titulo: 'Unidad N°1',
        temas: [
          'Subconsultas y consultas anidadas: definición, tipos (scalar, correlated) y casos de uso.',
          'Uso avanzado de funciones agregadas y de ventana (OVER(), PARTITION BY, RANK(), ROW_NUMBER()).',
          'Optimización de consultas: índices, EXPLAIN, análisis de planes de ejecución.'
        ]
      },
      {
        titulo: 'Unidad N°2',
        temas: [
          'Operaciones complejas de JOIN: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN y combinaciones múltiples.',
          'Uso de CTEs (WITH) y tablas temporales para estructurar consultas complejas.',
          'Técnicas avanzadas de actualización: MERGE, UPSERT y transacciones (BEGIN, COMMIT, ROLLBACK).'
        ]
      },
      {
        titulo: 'Unidad N°3',
        temas: [
          'Gestión avanzada de índices, constraints y triggers para mejorar rendimiento y consistencia.',
          'Uso de vistas y materialized views para optimizar consultas recurrentes.',
          'Monitorización de bases de datos: análisis de rendimiento, locking, deadlocks y tuning de consultas.'
        ]
      }
    ],
    docente: {
      nombre: 'Michael Widenius',
      foto: '/img/docente-sql-foto.jpeg',
      calificacion: '/img/docente-calificacion-cuatro-estrellas.png',
      descripcion: [
        'Conocido como el "Padre de MySQL", Michael Widenius es el creador de este sistema de gestión de bases de datos y un referente mundial en tecnologías open source. Con más de 30 años de experiencia, ha liderado proyectos clave en la evolución de SQL.',
        'Su enfoque claro y práctico, junto con su pasión por compartir conocimientos, lo convierten en un docente ideal para este curso avanzado.'
      ]
    },
    cursosRelacionados: ['java', 'python', 'javascript', 'testing']
  },
  
  testing: {
    id: 'testing',
    titulo: 'Testing básico',
    precio: '20.000',
    horas: 35,
    imagen: '/img/curso-testing.png',
    descripcion: [
      'Este curso ofrece una introducción al testing de software, brindando los fundamentos esenciales para garantizar la calidad de aplicaciones y sistemas.',
      'Aprenderás conceptos clave de QA, tipos de pruebas, técnicas básicas de diseño de casos de prueba y uso de herramientas para la detección de errores.',
      'Ideal para quienes comienzan en el mundo del aseguramiento de calidad y desean adquirir bases sólidas para testing manual.'
    ],
    requisitos: [
      'Conocimientos básicos de informática y uso de computadoras.',
      'Familiaridad con conceptos generales de desarrollo de software.',
      'Capacidad para leer documentación técnica en español o inglés.',
      'Ganas de aprender metodologías y técnicas de aseguramiento de calidad.'
    ],
    contenidos: [
      {
        titulo: 'Introducción',
        temas: [
          'Presentación del testing de software y su importancia en el ciclo de desarrollo.',
          'Tipos de testing: manual, automatizado, funcional y no funcional.',
          'Herramientas básicas para QA y entorno de trabajo.'
        ]
      },
      {
        titulo: 'Unidad N°1',
        temas: [
          'Principios y objetivos del aseguramiento de calidad.',
          'Ciclo de vida del testing: fases, planificación y ejecución.',
          'Tipos de pruebas: unitarias, de integración, de sistema y de aceptación.'
        ]
      },
      {
        titulo: 'Unidad N°2',
        temas: [
          'Documentación de pruebas: casos de prueba, matrices de trazabilidad y reportes de defectos.',
          'Técnicas de diseño: equivalencia de clases, análisis de valores límite y testing exploratorio.',
          'Uso básico de herramientas para la gestión de pruebas (por ejemplo, TestLink o Jira).'
        ]
      },
      {
        titulo: 'Unidad N°3',
        temas: [
          'Ejecución de pruebas: preparación, ejecución y seguimiento.',
          'Registro y priorización de defectos.',
          'Elaboración de reportes de testing y comunicación de resultados.'
        ]
      }
    ],
    docente: {
      nombre: 'Kent Beck',
      foto: '/img/docente-testing-foto.png',
      calificacion: '/img/docente-calificacion-cinco-estrellas.png',
      descripcion: [
        'Conocido como uno de los pioneros de las metodologías ágiles y creador de Extreme Programming (XP), Kent Beck es un referente mundial en aseguramiento de calidad y testing de software. Con más de 30 años de experiencia, ha trabajado en proyectos clave de empresas líderes en tecnología.',
        'Su dominio de buenas prácticas de testing y su habilidad para transmitir conceptos complejos lo convierten en el docente ideal para este curso.'
      ]
    },
    cursosRelacionados: ['python', 'sql', 'javascript', 'java']
  }
};