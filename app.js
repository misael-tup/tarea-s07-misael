console.log("Misael");

document.addEventListener("DOMContentLoaded", () => {
  const userDataContainer = document.getElementById("userData");
  const userTableBody = document.querySelector("#userTable tbody");

  // Función para realizar la solicitud a la API
  const fetchData = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?delay=3");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // Función para actualizar la interfaz de usuario
  const updateUI = (userData) => {
    const avatarStyle = "border-radius: 50%; width: 50px; height: 50px;";

    userDataContainer.innerHTML = `<p>Última actualización: ${new Date()}</p>`;
    userTableBody.innerHTML = "";

    userData.forEach((user) => {
      userTableBody.innerHTML += `
        <tr>
          <td>${user.id}</td>
          <td>${user.first_name} ${user.last_name}</td>
          <td><img src="${user.avatar}" alt="Avatar" style="${avatarStyle}"></td>
        </tr>
      `;
    });
  };

  // Función para manejar la lógica de caché
  const handleCache = () => {
    const cachedData = localStorage.getItem("userData");
    const cacheTimestamp = localStorage.getItem("cacheTimestamp");
    const currentTimestamp = new Date().getTime();
    const oneMinute = 5 * 1000;

    console.log("Consulta realizada a las:", new Date());

    if (
      cachedData &&
      cacheTimestamp &&
      currentTimestamp - cacheTimestamp < oneMinute
    ) {
      // Mostrar datos almacenados localmente
      const parsedData = JSON.parse(cachedData);
      updateUI(parsedData);
    } else {
      // Hacer nueva solicitud a la API
      fetchData().then((data) => {
        // Almacenar datos en local storage
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("cacheTimestamp", currentTimestamp);
        // Actualizar la interfaz de usuario
        updateUI(data);
      });
    }
  };

  // Cambiar el color de fondo al hacer una nueva solicitud
  const changeBackgroundColor = () => {
    const colors = [
      "#e6f7ff",
      "#ccf2ff",
      "#b3ecff",
      "#99e6ff",
      "#80dfff",
      "#ffe6e6",
      "#ffcccc",
      "#ffb3b3",
      "#ff9999",
      "#ff8080",
      "#e6ffe6",
      "#ccffcc",
      "#b3ffb3",
      "#99ff99",
      "#80ff80",
      "#fff2e6",
      "#ffebcc",
      "#ffe0b3",
      "#ffd699",
      "#ffcc80",
      "#f2f2f2",
      "#e6e6e6",
      "#cccccc",
      "#b3b3b3",
      "#999999",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  };

  // Realizar la lógica al cargar la página
  handleCache();
  changeBackgroundColor();

  // Hacer una nueva solicitud cada minuto
  setInterval(() => {
    handleCache();
    changeBackgroundColor();
  }, 5000);
});
