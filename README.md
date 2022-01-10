# Uso

Crea una base de datos con nombre **gruasyerovi** y corre el código .sql en _Tablas.sql_

Abre una terminal de comandos en el directorio del repositorio y utiliza

```
sequelize-auto -h localhost -d gruasyerovi -u root -x admin -p 3306 -T sequelizemeta
```

---

### Donde:

- Especifique el hostname después del parámetro -h \<host>
- Especifique el nombre de la base de datos después del parámetro -d \<database>
- Especifique el nombre del usuario después del parámetro -u \<user>
- Especifique la contraseña del usuario después del parámetro -x \<password>
- Especifique el puerto después del parámetro -p \<port>
- Especifique las tablas a omitir después del parámetro -T \<skiptables>
