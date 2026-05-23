import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Mail, Phone, Building2, MessageSquare } from "lucide-react";

/**
 * Diseño: Minimalismo Corporativo Futurista
 * - Validación en tiempo real con feedback visual
 * - Colores: Azul profundo (#0F3A7D), Verde esmeralda (#00A86B), Cian (#00D9FF)
 * - Animaciones suaves y transiciones de 200-300ms
 */

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  unidad: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  empresa?: string;
  telefono?: string;
  unidad?: string;
  mensaje?: string;
}

interface FieldStatus {
  nombre?: "valid" | "invalid" | "idle";
  email?: "valid" | "invalid" | "idle";
  empresa?: "valid" | "invalid" | "idle";
  telefono?: "valid" | "invalid" | "idle";
  unidad?: "valid" | "invalid" | "idle";
  mensaje?: "valid" | "invalid" | "idle";
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    unidad: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [fieldStatus, setFieldStatus] = useState<FieldStatus>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de teléfono (formato internacional)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Validar campo individual
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es requerido";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        if (value.trim().length > 100) return "El nombre no puede exceder 100 caracteres";
        return undefined;

      case "email":
        if (!value.trim()) return "El email es requerido";
        if (!validateEmail(value)) return "Ingresa un email válido";
        return undefined;

      case "empresa":
        if (!value.trim()) return "El nombre de la empresa es requerido";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        if (value.trim().length > 100) return "El nombre no puede exceder 100 caracteres";
        return undefined;

      case "telefono":
        if (!value.trim()) return "El teléfono es requerido";
        if (!validatePhone(value)) return "Ingresa un teléfono válido";
        return undefined;

      case "unidad":
        if (!value) return "Selecciona una unidad de negocio";
        return undefined;

      case "mensaje":
        if (!value.trim()) return "El mensaje es requerido";
        if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres";
        if (value.trim().length > 1000) return "El mensaje no puede exceder 1000 caracteres";
        return undefined;

      default:
        return undefined;
    }
  };

  // Manejar cambio de input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validación en tiempo real
    const error = validateField(name, value);
    if (value.trim()) {
      setFieldStatus((prev) => ({
        ...prev,
        [name]: error ? "invalid" : "valid",
      }));
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name as keyof FormErrors];
          return newErrors;
        });
      }
    } else {
      setFieldStatus((prev) => ({
        ...prev,
        [name]: "idle",
      }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  // Manejar cambio de Select
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, unidad: value }));
    setFieldStatus((prev) => ({
      ...prev,
      unidad: value ? "valid" : "idle",
    }));
    if (value) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.unidad;
        return newErrors;
      });
    }
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simular envío a servidor
      // En producción, aquí harías una llamada a tu API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setSubmitMessage("¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto pronto.");

      // Limpiar formulario
      setFormData({
        nombre: "",
        email: "",
        empresa: "",
        telefono: "",
        unidad: "",
        mensaje: "",
      });
      setFieldStatus({});
      setErrors({});

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="nombre" className="block text-sm font-semibold text-foreground">
            Nombre Completo *
          </label>
          <div className="relative">
            <Input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Juan García"
              value={formData.nombre}
              onChange={handleChange}
              className={`pl-10 transition-all duration-200 ${
                fieldStatus.nombre === "valid"
                  ? "border-secondary bg-green-50/30 focus:border-secondary"
                  : fieldStatus.nombre === "invalid"
                  ? "border-destructive bg-red-50/30 focus:border-destructive"
                  : "border-border"
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Building2 className="w-4 h-4" />
            </div>
            {fieldStatus.nombre === "valid" && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary animate-in fade-in duration-200" />
            )}
            {fieldStatus.nombre === "invalid" && (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive animate-in fade-in duration-200" />
            )}
          </div>
          {errors.nombre && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="w-3 h-3" />
              {errors.nombre}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-foreground">
            Email Corporativo *
          </label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="juan@empresa.com"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 transition-all duration-200 ${
                fieldStatus.email === "valid"
                  ? "border-secondary bg-green-50/30 focus:border-secondary"
                  : fieldStatus.email === "invalid"
                  ? "border-destructive bg-red-50/30 focus:border-destructive"
                  : "border-border"
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail className="w-4 h-4" />
            </div>
            {fieldStatus.email === "valid" && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary animate-in fade-in duration-200" />
            )}
            {fieldStatus.email === "invalid" && (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive animate-in fade-in duration-200" />
            )}
          </div>
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <label htmlFor="empresa" className="block text-sm font-semibold text-foreground">
            Empresa *
          </label>
          <div className="relative">
            <Input
              id="empresa"
              name="empresa"
              type="text"
              placeholder="Nombre de tu empresa"
              value={formData.empresa}
              onChange={handleChange}
              className={`pl-10 transition-all duration-200 ${
                fieldStatus.empresa === "valid"
                  ? "border-secondary bg-green-50/30 focus:border-secondary"
                  : fieldStatus.empresa === "invalid"
                  ? "border-destructive bg-red-50/30 focus:border-destructive"
                  : "border-border"
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Building2 className="w-4 h-4" />
            </div>
            {fieldStatus.empresa === "valid" && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary animate-in fade-in duration-200" />
            )}
            {fieldStatus.empresa === "invalid" && (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive animate-in fade-in duration-200" />
            )}
          </div>
          {errors.empresa && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="w-3 h-3" />
              {errors.empresa}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <label htmlFor="telefono" className="block text-sm font-semibold text-foreground">
            Teléfono *
          </label>
          <div className="relative">
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="+34 912 34 56 78"
              value={formData.telefono}
              onChange={handleChange}
              className={`pl-10 transition-all duration-200 ${
                fieldStatus.telefono === "valid"
                  ? "border-secondary bg-green-50/30 focus:border-secondary"
                  : fieldStatus.telefono === "invalid"
                  ? "border-destructive bg-red-50/30 focus:border-destructive"
                  : "border-border"
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Phone className="w-4 h-4" />
            </div>
            {fieldStatus.telefono === "valid" && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary animate-in fade-in duration-200" />
            )}
            {fieldStatus.telefono === "invalid" && (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive animate-in fade-in duration-200" />
            )}
          </div>
          {errors.telefono && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="w-3 h-3" />
              {errors.telefono}
            </p>
          )}
        </div>

        {/* Unidad de Negocio */}
        <div className="space-y-2">
          <label htmlFor="unidad" className="block text-sm font-semibold text-foreground">
            Unidad de Negocio de Interés *
          </label>
          <Select value={formData.unidad} onValueChange={handleSelectChange}>
            <SelectTrigger
              className={`transition-all duration-200 ${
                fieldStatus.unidad === "valid"
                  ? "border-secondary bg-green-50/30"
                  : fieldStatus.unidad === "invalid"
                  ? "border-destructive bg-red-50/30"
                  : "border-border"
              }`}
            >
              <SelectValue placeholder="Selecciona una unidad..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="industrial">NEXERGY INDUSTRIAL - Optimización de operaciones</SelectItem>
              <SelectItem value="energy">NEXERGY ENERGY - Gestión energética</SelectItem>
              <SelectItem value="agents">NEXERGY AGENTS - Agentes de IA</SelectItem>
              <SelectItem value="digital-twin">NEXERGY DIGITAL TWIN - Gemelos digitales</SelectItem>
              <SelectItem value="labs">NEXERGY LABS - Investigación e innovación</SelectItem>
            </SelectContent>
          </Select>
          {errors.unidad && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="w-3 h-3" />
              {errors.unidad}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <label htmlFor="mensaje" className="block text-sm font-semibold text-foreground">
            Mensaje *
          </label>
          <div className="relative">
            <Textarea
              id="mensaje"
              name="mensaje"
              placeholder="Cuéntanos sobre tu desafío operacional y cómo podemos ayudarte..."
              value={formData.mensaje}
              onChange={handleChange}
              rows={5}
              className={`pl-10 pt-3 transition-all duration-200 resize-none ${
                fieldStatus.mensaje === "valid"
                  ? "border-secondary bg-green-50/30 focus:border-secondary"
                  : fieldStatus.mensaje === "invalid"
                  ? "border-destructive bg-red-50/30 focus:border-destructive"
                  : "border-border"
              }`}
            />
            <div className="absolute left-3 top-3 text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
            </div>
            {fieldStatus.mensaje === "valid" && (
              <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-secondary" />
            )}
            {fieldStatus.mensaje === "invalid" && (
              <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-destructive" />
            )}
          </div>
          <div className="flex justify-between items-start">
            {errors.mensaje && (
              <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in duration-200">
                <AlertCircle className="w-3 h-3" />
                {errors.mensaje}
              </p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {formData.mensaje.length}/1000
            </p>
          </div>
        </div>

        {/* Mensaje de estado */}
        {submitStatus !== "idle" && (
          <div
            className={`p-4 rounded-lg flex items-center gap-3 animate-in fade-in duration-200 ${
              submitStatus === "success"
                ? "bg-green-50 border border-secondary text-secondary"
                : "bg-red-50 border border-destructive text-destructive"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{submitMessage}</p>
          </div>
        )}

        {/* Botón de envío */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold transition-all duration-200 disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Enviando...
            </div>
          ) : (
            "Enviar Solicitud"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Respetamos tu privacidad. Tus datos serán procesados de acuerdo a nuestra política de privacidad.
        </p>
      </form>
    </div>
  );
}
