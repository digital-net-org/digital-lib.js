import { Box, InputSelect } from '../../../../../react-digital-ui';
import { localizationDefaults, useLocalization } from '../../../../Localization';

export default function User() {
    const { translate, currentLanguage, setLanguage } = useLocalization();
    return (
        <Box gap={2}>
            <InputSelect
                required
                options={[...localizationDefaults.supportedLanguages]}
                label={translate('app:settings.options.language.label')}
                value={currentLanguage}
                onChange={setLanguage}
                onRender={value => translate(`app:settings.options.language.inputs.${value}`)}
            />
        </Box>
    );
}
