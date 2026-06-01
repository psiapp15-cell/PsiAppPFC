import {
  Alert,
  Avatar,
  Badge,
  Box,
  Group,
  List,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconLock,
  IconShieldLock,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { PageSkeleton } from '../components/layout/PageSkeleton';
import { linkedPatients } from '../mocks/data';
import { palette } from '../theme';
import { shortDate } from '../utils/display';

export function PsychologistRecord() {
  return (
    <PageSkeleton
      title="Prontuário"
      subtitle="Só layout de exemplo — sem dados clínicos nesta entrega."
    >
      <Alert
        color="orange"
        radius="md"
        icon={<IconAlertTriangle size={20} />}
        title="Área restrita"
      >
        <Stack gap={6}>
          <Text fz={14}>
            Ainda não implementamos o prontuário de verdade. Quando formos fazer,
            vai precisar disto aqui embaixo:
          </Text>
          <List size="sm" spacing={2}>
            <List.Item>Login seguro com validação de token.</List.Item>
            <List.Item>Permissão de acesso conforme o perfil do usuário.</List.Item>
            <List.Item>Dados isolados por clínica ou organização.</List.Item>
            <List.Item>Verificação de <b>vínculo terapêutico</b> ativo entre paciente e psicólogo.</List.Item>
            <List.Item>Registro de <b>auditoria</b> em consultas sensíveis.</List.Item>
          </List>
        </Stack>
      </Alert>

      {/* lista fake de pacientes */}
      <Box>
        <Text fw={700} fz={16} mb="md">
          Pacientes vinculados
        </Text>
        <Stack gap="sm">
          {linkedPatients.map((p) => (
            <Group
              key={p.id}
              justify="space-between"
              wrap="nowrap"
              className="psi-card"
              p="md"
            >
              <Group gap={14} wrap="nowrap">
                <Avatar src={p.avatar} radius="xl" size={48} />
                <Box>
                  <Text fw={700} fz={15}>
                    {p.name}
                  </Text>
                  <Text fz={12} c={palette.textSecondary}>
                    Vínculo desde {shortDate(p.since)} • {p.sessions} sessões
                  </Text>
                </Box>
              </Group>
              <Badge
                variant="light"
                color="gray"
                radius="sm"
                size="lg"
                leftSection={<IconLock size={14} />}
              >
                Prontuário bloqueado
              </Badge>
            </Group>
          ))}
        </Stack>
      </Box>

      {/* aviso central */}
      <Box className="psi-card" p="xl" style={{ display: 'grid', placeItems: 'center' }}>
        <Stack align="center" gap={10} maw={520}>
          <ThemeIcon variant="light" color="psiTeal" radius="xl" size={64}>
            <IconShieldLock size={32} />
          </ThemeIcon>
          <Text fw={700} fz={18} ta="center">
            Conteúdo clínico protegido
          </Text>
          <Text fz={14} c={palette.textSecondary} ta="center">
            Por enquanto é só a tela. Anotações e histórico ficam pro 8º período,
            com backend e permissões certas.
          </Text>
        </Stack>
      </Box>
    </PageSkeleton>
  );
}
