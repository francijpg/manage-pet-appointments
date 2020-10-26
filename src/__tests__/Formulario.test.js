import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";

const crearCita = jest.fn();

// en primeras versiones se requeria
// afterEach(cleanup);

test("<Formulario /> Cargar el formulario y revisar que todo sea correcto", () => {
  // const wrapper = render(<Formulario />);
  // wrapper.debug();

  render(<Formulario crearCita={crearCita} />);
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();

  // Heading
  const titulo = screen.getByTestId("titulo");
  expect(titulo.tagName).toBe("H2");
  expect(titulo.tagName).not.toBe("H1");
  expect(titulo.textContent).toBe("Crear Cita");

  // Botón de Submit
  const btnSubmit = screen.getByTestId("btn-submit");
  expect(btnSubmit.tagName).toBe("BUTTON");
  expect(btnSubmit.textContent).toBe("Agregar Cita");
  expect(btnSubmit.textContent).not.toBe("Agregar Nueva Cita");
});

test("<Formulario /> Validación de formulario", () => {
  render(<Formulario crearCita={crearCita} />);

  //Click en el botón de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  fireEvent.click(btnSubmit);

  // Revisar por la alerta
  const alerta = screen.getByTestId("alerta");
  const alertMessage = "Todos los campos son obligatorios";

  expect(alerta).toBeInTheDocument();
  expect(alerta.textContent).toBe(alertMessage);
  expect(alerta.tagName).toBe("P");
  expect(alerta.tagName).not.toBe("BUTTON");
});

test("<Formulario /> Validación de formulario", () => {
  render(<Formulario crearCita={crearCita} />);

  fireEvent.change(screen.getByTestId("mascota"), {
    target: { value: "Hook" },
  });
  fireEvent.change(screen.getByTestId("propietario"), {
    target: { value: "React" },
  });

  //Click en el botón de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  fireEvent.click(btnSubmit);
});
