import { Plate, type PlateEditor, type PlateProps } from "@udecode/plate-common/react"
import { Value } from "@udecode/plate-common"

export { ContentEditor as Content } from "./plate-ui/ContentEditor"
export { FixedToolbar } from "./plate-ui/fixed-toolbar"
export { FixedToolbarButtons } from "./plate-ui/fixed-toolbar-buttons"

type EditorProps = {
    onValueChange?: (value: Value) => unknown
    editor?: PlateEditor
} & PlateProps

export const Editor = ({ onValueChange, ...props }: EditorProps) => {
    return (
        <Plate {...props} onValueChange={(e) => onValueChange && onValueChange(e.value)}>
            {props.children}
        </Plate>
    )
}
