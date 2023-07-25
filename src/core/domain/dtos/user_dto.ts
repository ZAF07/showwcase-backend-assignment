/*
 💡 DTOs (Data Transfer object) are objects used typically to pass data between the Controllers & Services (or really to transfer data across any componets or layers of the application). They are uesd to represent a subset of data from a more complex domain model. They are used to reduce the amount of data sent over the network and to decouple the data representation from the internal structure of the application.
 While DTOs can have similar attributes and fields to the domain models, they may not necessarily mirror them exactly
 The main idea behind using DTOs is to decouple the internal domain models from the external data representation. This allows you to have more control over what data is exposed to the external world, and it can also help in achieving better separation of concerns and maintainability
*/
// import { Name, Dob, ID, Picture, Location } from "../models/user";
export type User = { email: string; password?: string };
export type RandomUser = { firstName: string; age: number };

export type RandomUserDetailsDTO = {
  gender?: string;
  name?: NameDTO;
  location?: Location;
  email?: string;
  login?: LoginDTO;
  dob?: Dob;
  registered?: Dob;
  phone?: string;
  cell?: string;
  id?: ID;
  picture?: Picture;
  nat?: string;
};

export type LoginDTO = {
  uuid?: string;
  username?: string;
};

export type Dob = {
  date: Date;
  age: number;
};

export type ID = {
  name: string;
  value: string;
};

export type Location = {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
};

export type Coordinates = {
  latitude: string;
  longitude: string;
};

export type Street = {
  number: number;
  name: string;
};

export type Timezone = {
  offset: string;
  description: string;
};

export type Login = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

export type NameDTO = {
  title?: string;
  first: string;
  last: string;
};

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};
// To parse this data:
//
//   import { Convert, RandomUserDetails } from "./file";
//
//   const RandomUserDetails = Convert.toRandomUserDetails(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// export type RandomUserDetails = {
//   results: Result[];
//   info: Info;
// };

// export type Info = {
//   seed: string;
//   results: number;
//   page: number;
//   version: string;
// };

// export type Result = {
//   gender: string;
//   name: Name;
//   location: Location;
//   email: string;
//   login: Login;
//   dob: Dob;
//   registered: Dob;
//   phone: string;
//   cell: string;
//   id: ID;
//   picture: Picture;
//   nat: string;
// };

// export type Dob = {
//   date: Date;
//   age: number;
// };

// export type ID = {
//   name: string;
//   value: string;
// };

// export type Location = {
//   street: Street;
//   city: string;
//   state: string;
//   country: string;
//   postcode: number;
//   coordinates: Coordinates;
//   timezone: Timezone;
// };

// export type Coordinates = {
//   latitude: string;
//   longitude: string;
// };

// export type Street = {
//   number: number;
//   name: string;
// };

// export type Timezone = {
//   offset: string;
//   description: string;
// };

// export type Login = {
//   uuid: string;
//   username: string;
//   password: string;
//   salt: string;
//   md5: string;
//   sha1: string;
//   sha256: string;
// };

// export type Name = {
//   title: string;
//   first: string;
//   last: string;
// };

// export type Picture = {
//   large: string;
//   medium: string;
//   thumbnail: string;
// };

// // Converts JSON strings to/from your types
// // and asserts the results of JSON.parse at runtime
// export class Convert {
//   public static toRandomUserDetails(json: string): RandomUserDetails {
//     return cast(JSON.parse(json), r("RandomUserDetails"));
//   }

//   public static RandomUserDetailsToJson(value: RandomUserDetails): string {
//     return JSON.stringify(uncast(value, r("RandomUserDetails")), null, 2);
//   }
// }

// function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
//   const prettyTyp = prettyTypeName(typ);
//   const parentText = parent ? ` on ${parent}` : "";
//   const keyText = key ? ` for key "${key}"` : "";
//   throw Error(
//     `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
//       val
//     )}`
//   );
// }

// function prettyTypeName(typ: any): string {
//   if (Array.isArray(typ)) {
//     if (typ.length === 2 && typ[0] === undefined) {
//       return `an optional ${prettyTypeName(typ[1])}`;
//     } else {
//       return `one of [${typ
//         .map((a) => {
//           return prettyTypeName(a);
//         })
//         .join(", ")}]`;
//     }
//   } else if (typeof typ === "object" && typ.literal !== undefined) {
//     return typ.literal;
//   } else {
//     return typeof typ;
//   }
// }

// function jsonToJSProps(typ: any): any {
//   if (typ.jsonToJS === undefined) {
//     const map: any = {};
//     typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
//     typ.jsonToJS = map;
//   }
//   return typ.jsonToJS;
// }

// function jsToJSONProps(typ: any): any {
//   if (typ.jsToJSON === undefined) {
//     const map: any = {};
//     typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
//     typ.jsToJSON = map;
//   }
//   return typ.jsToJSON;
// }

// function transform(
//   val: any,
//   typ: any,
//   getProps: any,
//   key: any = "",
//   parent: any = ""
// ): any {
//   function transformPrimitive(typ: string, val: any): any {
//     if (typeof typ === typeof val) return val;
//     return invalidValue(typ, val, key, parent);
//   }

//   function transformUnion(typs: any[], val: any): any {
//     // val must validate against one typ in typs
//     const l = typs.length;
//     for (let i = 0; i < l; i++) {
//       const typ = typs[i];
//       try {
//         return transform(val, typ, getProps);
//       } catch (_) {}
//     }
//     return invalidValue(typs, val, key, parent);
//   }

//   function transformEnum(cases: string[], val: any): any {
//     if (cases.indexOf(val) !== -1) return val;
//     return invalidValue(
//       cases.map((a) => {
//         return l(a);
//       }),
//       val,
//       key,
//       parent
//     );
//   }

//   function transformArray(typ: any, val: any): any {
//     // val must be an array with no invalid elements
//     if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
//     return val.map((el) => transform(el, typ, getProps));
//   }

//   function transformDate(val: any): any {
//     if (val === null) {
//       return null;
//     }
//     const d = new Date(val);
//     if (isNaN(d.valueOf())) {
//       return invalidValue(l("Date"), val, key, parent);
//     }
//     return d;
//   }

//   function transformObject(
//     props: { [k: string]: any },
//     additional: any,
//     val: any
//   ): any {
//     if (val === null || typeof val !== "object" || Array.isArray(val)) {
//       return invalidValue(l(ref || "object"), val, key, parent);
//     }
//     const result: any = {};
//     Object.getOwnPropertyNames(props).forEach((key) => {
//       const prop = props[key];
//       const v = Object.prototype.hasOwnProperty.call(val, key)
//         ? val[key]
//         : undefined;
//       result[prop.key] = transform(v, prop.typ, getProps, key, ref);
//     });
//     Object.getOwnPropertyNames(val).forEach((key) => {
//       if (!Object.prototype.hasOwnProperty.call(props, key)) {
//         result[key] = transform(val[key], additional, getProps, key, ref);
//       }
//     });
//     return result;
//   }

//   if (typ === "any") return val;
//   if (typ === null) {
//     if (val === null) return val;
//     return invalidValue(typ, val, key, parent);
//   }
//   if (typ === false) return invalidValue(typ, val, key, parent);
//   let ref: any = undefined;
//   while (typeof typ === "object" && typ.ref !== undefined) {
//     ref = typ.ref;
//     typ = typeMap[typ.ref];
//   }
//   if (Array.isArray(typ)) return transformEnum(typ, val);
//   if (typeof typ === "object") {
//     return typ.hasOwnProperty("unionMembers")
//       ? transformUnion(typ.unionMembers, val)
//       : typ.hasOwnProperty("arrayItems")
//       ? transformArray(typ.arrayItems, val)
//       : typ.hasOwnProperty("props")
//       ? transformObject(getProps(typ), typ.additional, val)
//       : invalidValue(typ, val, key, parent);
//   }
//   // Numbers can be parsed by Date but shouldn't be.
//   if (typ === Date && typeof val !== "number") return transformDate(val);
//   return transformPrimitive(typ, val);
// }

// function cast<T>(val: any, typ: any): T {
//   return transform(val, typ, jsonToJSProps);
// }

// function uncast<T>(val: T, typ: any): any {
//   return transform(val, typ, jsToJSONProps);
// }

// function l(typ: any) {
//   return { literal: typ };
// }

// function a(typ: any) {
//   return { arrayItems: typ };
// }

// function u(...typs: any[]) {
//   return { unionMembers: typs };
// }

// function o(props: any[], additional: any) {
//   return { props, additional };
// }

// function m(additional: any) {
//   return { props: [], additional };
// }

// function r(name: string) {
//   return { ref: name };
// }

// const typeMap: any = {
//   RandomUserDetails: o(
//     [
//       { json: "results", js: "results", typ: a(r("Result")) },
//       { json: "info", js: "info", typ: r("Info") },
//     ],
//     false
//   ),
//   Info: o(
//     [
//       { json: "seed", js: "seed", typ: "" },
//       { json: "results", js: "results", typ: 0 },
//       { json: "page", js: "page", typ: 0 },
//       { json: "version", js: "version", typ: "" },
//     ],
//     false
//   ),
//   Result: o(
//     [
//       { json: "gender", js: "gender", typ: "" },
//       { json: "name", js: "name", typ: r("Name") },
//       { json: "location", js: "location", typ: r("Location") },
//       { json: "email", js: "email", typ: "" },
//       { json: "login", js: "login", typ: r("Login") },
//       { json: "dob", js: "dob", typ: r("Dob") },
//       { json: "registered", js: "registered", typ: r("Dob") },
//       { json: "phone", js: "phone", typ: "" },
//       { json: "cell", js: "cell", typ: "" },
//       { json: "id", js: "id", typ: r("ID") },
//       { json: "picture", js: "picture", typ: r("Picture") },
//       { json: "nat", js: "nat", typ: "" },
//     ],
//     false
//   ),
//   Dob: o(
//     [
//       { json: "date", js: "date", typ: Date },
//       { json: "age", js: "age", typ: 0 },
//     ],
//     false
//   ),
//   ID: o(
//     [
//       { json: "name", js: "name", typ: "" },
//       { json: "value", js: "value", typ: "" },
//     ],
//     false
//   ),
//   Location: o(
//     [
//       { json: "street", js: "street", typ: r("Street") },
//       { json: "city", js: "city", typ: "" },
//       { json: "state", js: "state", typ: "" },
//       { json: "country", js: "country", typ: "" },
//       { json: "postcode", js: "postcode", typ: 0 },
//       { json: "coordinates", js: "coordinates", typ: r("Coordinates") },
//       { json: "timezone", js: "timezone", typ: r("Timezone") },
//     ],
//     false
//   ),
//   Coordinates: o(
//     [
//       { json: "latitude", js: "latitude", typ: "" },
//       { json: "longitude", js: "longitude", typ: "" },
//     ],
//     false
//   ),
//   Street: o(
//     [
//       { json: "number", js: "number", typ: 0 },
//       { json: "name", js: "name", typ: "" },
//     ],
//     false
//   ),
//   Timezone: o(
//     [
//       { json: "offset", js: "offset", typ: "" },
//       { json: "description", js: "description", typ: "" },
//     ],
//     false
//   ),
//   Login: o(
//     [
//       { json: "uuid", js: "uuid", typ: "" },
//       { json: "username", js: "username", typ: "" },
//       { json: "password", js: "password", typ: "" },
//       { json: "salt", js: "salt", typ: "" },
//       { json: "md5", js: "md5", typ: "" },
//       { json: "sha1", js: "sha1", typ: "" },
//       { json: "sha256", js: "sha256", typ: "" },
//     ],
//     false
//   ),
//   Name: o(
//     [
//       { json: "title", js: "title", typ: "" },
//       { json: "first", js: "first", typ: "" },
//       { json: "last", js: "last", typ: "" },
//     ],
//     false
//   ),
//   Picture: o(
//     [
//       { json: "large", js: "large", typ: "" },
//       { json: "medium", js: "medium", typ: "" },
//       { json: "thumbnail", js: "thumbnail", typ: "" },
//     ],
//     false
//   ),
// };
