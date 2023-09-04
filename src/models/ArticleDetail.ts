/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Article } from './Article';
import type { Comment } from './Comment';

export type ArticleDetail = (Article & {
content?: string;
readonly comments?: Array<Comment>;
});
