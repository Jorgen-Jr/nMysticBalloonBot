export type query = {
  id: string;
  from?: any;
  location?: any;
  query: string;
  offset?: string;
};

export type InlineQueryResult = TelegramBot.InlineQueryResult;

export type InlineQueryResultArticle = {
  type: string;
  id: string;
  title: string;
  input_message_content: InputTextMessageContent;
  reply_markup?: any;
  url?: string;
  hide_url?: boolean;
  description?: string;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
};

export type InputTextMessageContent = {
  message_text: string;
  parse_mode?: "HTML" | "MarkdownV2" | "Markdown";
  disable_web_page_preview?: boolean;
};

export type balloon = {
  char_name: string;
  name: string;
  prefix: string;
  startHeight: number;
  startWidth: number;
  address: string;
  fontSize?: string;
  lineHeight?: number;
  font: font;
};

export type font = {
  name: string;
  address: string;
};
