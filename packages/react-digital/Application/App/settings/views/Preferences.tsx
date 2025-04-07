import { Box, InputSelect } from '../../../../../react-digital-ui';
import { Localization, useLocalization } from '../../../../Localization';

export default function Preferences() {
    const { currentLanguage, setLanguage } = useLocalization();
    return (
        <Box gap={2}>
            <InputSelect
                required
                options={[...Localization.supportedLanguages]}
                label={Localization.translate('app:settings.options.language.label')}
                value={currentLanguage}
                onChange={setLanguage}
                onRender={value => Localization.translate(`app:settings.options.language.inputs.${value}`)}
            />
        </Box>
    );
}
