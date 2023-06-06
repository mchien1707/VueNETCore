/* eslint-disable */

export default {
  field: {
    rootClass: "field",
    labelClass: "form-label",
    messageClass: "form-text",
    variantClass: "field-",
  },
  input: {
    inputClass: "form-control",
    variantClass: (variant: string) => {
      switch (variant) {
        case "danger":
          return "is-invalid";
      }
    },
  },
  button: {
    rootClass: "btn",
    outlinedClass: "btn-outline-",
    disabledClass: "btn-disabled",
    variantClass: (variant: string, context: any) => {
      // Apply variant when the element is not outlined
      if (!context.props.outlined) {
        return `btn-${variant}`;
      }
    },
  },
};
