let meditatorTemplate = {
  title: "Create your meditator's profile",
  subtitle: "meditator",
  buttonText: "submit",
  fields: [
    {
      title: "meditator",
      type: "radio",
      name: "meditator",
    },
    {
      title: "teacher",
      type: "radio",
      name: "teacher",
    },
    {
      title: "Years",
      type: "text",
      name: "years",
      placeholder: "number of years meditating...",
    },
    {
      title: "Stage",
      type: "text",
      name: "stage",
      placeholder: "stage are you currently working on...",
    },
  ],
};

let teacherTemplate = {
  title: "Create your teacher's profile",
  subtitle: "teacher",
  buttonText: "submit",
  fields: [
    {
      title: "status",
      type: "radio",
      name: "meditator",
    },
    {
      title: "status",
      type: "radio",
      name: "teacher",
    },
    {
      title: "firstname",
      type: "text",
      name: "firstname",
      placeholder: "first name...",
    },
    {
      title: "lastname",
      type: "text",
      name: "lastname",
      placeholder: "last name...",
    },
    {
      title: "years",
      type: "text",
      name: "years",
      placeholder: "number of years meditating...",
    },
    {
      title: "story",
      type: "textarea",
      name: "story",
      placeholder: "tell us about you...",
    },
  ],
};

export { teacherTemplate, meditatorTemplate };
