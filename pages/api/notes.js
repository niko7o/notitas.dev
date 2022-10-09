// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const arrayDefault = [
    {
      id: `0`,
      title: "Kodak ColorPlus",
      description:
        "Kodak ColorPlus 200 is a ISO 200, daylight-balanced, color negative film with a fine grain structure and a wide exposure latitude. It is a good choice for general photography, especially in bright light.",
      creationDate: new Date(),
      isCompleted: false,
    },
    {
      id: `1`,
      title: "Kodak ColorPlus 2",
      description:
        "Kodak ColorPlus 200 is a ISO 200, daylight-balanced, color negative film with a fine grain structure and a wide exposure latitude. It is a good choice for general photography, especially in bright light.",
      creationDate: new Date(),
      isCompleted: false,
    },
    {
      id: `2`,
      title: "Kodak ColorPlus 3",
      description:
        "Kodak ColorPlus 200 is a ISO 200, daylight-balanced, color negative film with a fine grain structure and a wide exposure latitude. It is a good choice for general photography, especially in bright light.",
      creationDate: new Date(),
      isCompleted: false,
    },
  ];

  res.status(200).json(arrayDefault);
}
