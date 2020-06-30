/// <reference types="react" />
import { TranslationGeneric } from '../../util';
export declare const LabelWrapper: import("styled-components").StyledComponent<"p", any, {}, never>;
export declare const Label: <TM extends TranslationGeneric>(props: {
    style?: Partial<{
        label: import("styled-components").CSSProperties;
        groupTitle: import("styled-components").CSSProperties;
        sectionTitle: import("styled-components").CSSProperties;
        wrapper: import("styled-components").CSSProperties;
    }>;
    label: keyof TM;
}) => JSX.Element;
