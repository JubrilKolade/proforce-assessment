/**
 * Shape returned by https://687124747ca4d06b34b97d3d.mockapi.io/api/userId
 *
 * mockapi.io seeds every record with a faker-generated avatar/email/phone in
 * addition to whatever fields we POST, so those come back on every record
 * even though we only ever submit `name`, `location` and `dob` ourselves.
 * Everything except `id` and `name` is therefore treated as optional and
 * rendered with sane fallbacks throughout the UI.
 */
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  dob?: string;
  createdAt?: string;
}

/** Payload for creating a new user — the only fields the "Add user" form collects. */
export interface CreateUserPayload {
  name: string;
  location: string;
  dob: string;
}
