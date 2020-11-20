export function getPropertyTypeId(name: string) {
  const types = [
    {
      id: "5897c511-6d51-47f9-889e-3e9ca14c8ce3",
      name: {
        ar: "ستوديو",
        en: "studio",
      },
      sk_id: "5f32851c1dfb1b8a0829612a",
    },
    {
      id: "f976eef3-5b52-4f66-b71c-b17878db5a14",
      name: {
        ar: "شقة",
        en: "apartment apt 1 br 2 br 3 br",
      },
      sk_id: "5f328595b7253d1b1e7a5b6e",
    },
    {
      id: "e26d2478-e4e0-44d6-ba71-513b7b89ee3c",
      name: {
        ar: "بنتهاوس",
        en: "penthouse",
      },
      sk_id: "5f3285abb7253d1b1e7a5b6f",
    },
    {
      id: "5fe79a1c-bf0e-48ca-abd7-d2552246e777",
      name: {
        ar: "دوبلكس",
        en: "duplex",
      },
      sk_id: "5f3285c1b7253d1b1e7a5b70",
    },
    {
      id: "a32baf43-872c-4a97-a414-e184bf5d0f1f",
      name: {
        ar: "فيلا",
        en:
          "villa stanalone villa ivilla i-villa palace small villa stand alone loft standalone villa",
      },
      sk_id: "5f3285d5b7253d1b1e7a5b71",
    },
    {
      id: "fe4d4e50-f1bb-4e28-807d-c523aac179fb",
      name: {
        ar: "توين هاوس",
        en: "twin house twinhouse",
      },
      sk_id: "5f3285eab7253d1b1e7a5b72",
    },
    {
      id: "add5f6a6-1c79-4eba-8024-80a7b6c5c374",
      name: {
        ar: "تاون هاوس",
        en: "town house townhouse",
      },
      sk_id: "5f328603b7253d1b1e7a5b73",
    },
    {
      id: "5c7f51f5-51dd-4699-ac37-988d9fff3976",
      name: {
        en: "chalet",
      },
    },
  ];
  const found = types.filter((single) =>
    single.name.en.includes(name.toLowerCase().trim())
  );
  return found[0].id;
}
