# Database Schema

## User Table
| Column Name | Data Type | Primary Key | Unique | Nullable |
|-------------|-----------|-------------|--------|----------|
| user_id     | Integer   | Yes         | No     | No       |
| username   | String(80) | No          | Yes    | No       |
| password   | String(120) | No         | No     | No       |
| token      | Integer   | No          | Yes    | No       |

## Model Table
| Column Name | Data Type | Primary Key | Unique | Nullable | Foreign Key |
|-------------|-----------|-------------|--------|----------|-------------|
| model_id   | Integer   | Yes         | No     | No       |             |
| model_name | String(80) | No          | Yes    | No       |             |
| family     | String(20) | No          | No     | No       |             |
| user_id    | Integer   | No          | No     | No       | user(user_id) |
| text_id    | Integer   | No          | No     | No       | text(text_id) |

## Text Table
| Column Name   | Data Type | Primary Key | Unique | Nullable | Foreign Key |
|---------------|-----------|-------------|--------|----------|-------------|
| text_id       | Integer   | Yes         | No     | No       |             |
| date_uploaded | DateTime  | No          | No     | No       |             |
| size          | Integer   | No          | No     | No       |             |
| title         | String(80) | No          | No     | No       |             |
| author        | String(80) | No          | No     | Yes      |             |
| user_id       | Integer   | No          | No     | No       | user(user_id) |
| filename      | String(120) | No         | No     | No       |             |

## Clean_Text Table
| Column Name    | Data Type | Primary Key | Unique | Nullable | Foreign Key |
|----------------|-----------|-------------|--------|----------|-------------|
| clean_text_id  | Integer   | Yes         | No     | No       |             |
| date_processed | DateTime  | No          | No     | No       |             |
| text_id        | Integer   | No          | No     | No       | text(text_id) |
| user_id        | Integer   | No          | No     | No       | user(user_id) |
| options        | String(512) | No        | No     | No       |             |
| filename       | String(120) | No         | No     | No       |             |

*Foreign Key Constraints*
- The Model table references the User table by the user_id column.
- The Model table references the Text table by the text_id column.
- The Text table references the User table by the user_id column.
- The Clean_Text table references the Text table by the text_id column.
- The Clean_Text table references the User table by the user_id column.
