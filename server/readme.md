## Schemas

### `AuthSchema`

```
{
    type: "string",
    pattern: "^Bearer [\w-]*\.[\w-]*\.[\w-]*$",
}
```

### `PhotoSchema`

```
{
    type: "object"
    properties: {
        alt: {
            type: "string",
        },
        width: {
            type: "number",
        },
        height: {
            type: "number",
        },
        low: {
            type: "string",
        },
        medium: {
            type: "string",
        },
        high: {
            type: "string",
        },
    },
}
```

### `PngSchema`
```
{
    "type": "string",
    "contentEncoding": "base64",
    "contentMediaType": "image/png",
}
```


## Endpoints

---

### `GET api/v1/collections`

**Description:** Retrieves a list of all collections, with their populated artworks and images.

**Request Headers:**

```
{
    Authorization: AuthSchema,
    required: ["Authorization"],
}
```

**200 Response  Payload:**

```
{
    type: "array",
    items: {
        type: "object",
        properties: {
            id: {
                type: "string",
            },
            title: {
                type: "string",
            },
            works: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                        },
                        image: PhotoSchema,
                        title: {
                            type: "string",
                        },
                        year: {
                            type: "string",
                        },
                        medium: {
                            type: "string",
                        },
                        width: {
                            type: "number",
                        },
                        height: {
                            type: "number",
                        },
                    },
                }
            },
        },
    },
}
```

---

### `POST api/v1/collections`

**Description:** Adds a new collection to the list of collections

**Request Headers:**

```
{
    Authorization: AuthSchema,
    required: ["Authorization"],
}
```

**200 Request Payload:**

```
{
    "title": {
        type: "string",
    },
}
```

---

### `PATCH api/v1/collections/:collectionId`

**Description:** Update the title of a collection document

**Request Headers:**

```
{
    Authorization: AuthSchema,
    required: ["Authorization"],
}
```

**Request Payload:**

```
{
    "title": {
        type: "string",
    },
}
```

---

### `POST api/v1/collections/:collectionId/works`

**Description:**
- Adds a new work to the list of works in a collection. 
- Request can either specify an existing workId, or new work data
- Ensures that collection doesn't contain duplicates references to works
- Creates a work document unless a workId is specified
- If a workId is specified, the remaining data is not used.
- If a workID is specified, then a fromCollectionId can be specified for drag & drop
    - work reference will be removed from the collection

**Request Headers:**

```
{
    Authorization: AuthSchema,
    required: ["Authorization"],
}
```

**Request form-data with workId:**

```
{
    type: "object",
    properties: {
        id: {
            type: "string",
        },
        fromId: {
            type: "string",
        }
    },
    required: ["id"],
},
```

**Request form-data with work data:**

```
{
    type: "object",
    properties: {
        title: {
            type: "string",
        },
        year: {
            type: "string",
        },
        medium: {
            type: "string",
        },
        width: {
            type: "number",
        },
        height: {
            type: "number",
        },
        image: PngSchema,
    },
    required: ["title", "image"]
}
```

### `PATCH api/v1/works/:workId`

**Description:**
- Adds a new work to the list of works in a collection. 
- Request can either specify an existing workId, or new work data
- Ensures that collection doesn't contain duplicates references to works
- Creates a work document unless a workId is specified
- If a workId is specified, the remaining data is not used.
- If a workID is specified, then a fromCollectionId can be specified for drag & drop
    - work reference will be removed from the collection

**Request Headers:**

```
{
    type: "object",
    properties: {
        Authorization: AuthSchema,
        required: ["Authorization"],
    }
}
```

**Request JSON Payload:**

```
{
    type: "object",
    properties: {
        title: {
            type: "string",
        },
        image: PngSchema,
        year: {
            type: "string",
        },
        medium: {
            type: "string",
        },
        width: {
            type: "number",
        },
        height: {
            type: "number",
        },
    },
}
```