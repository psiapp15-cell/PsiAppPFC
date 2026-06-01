import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Skeleton,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCalendarOff, IconSearch } from '@tabler/icons-react';
import { PageSkeleton } from '../components/layout/PageSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { useAppointments, useCancelAppointment } from '../hooks/useAppointments';
import type { AppointmentStatus, PatientAppointment } from '../types';
import { palette } from '../theme';
import { modalityLabel, shortDate, statusMeta } from '../utils/display';

type TabKey = 'PENDENTE' | 'CONFIRMADA' | 'REALIZADA' | 'others';

export const APPOINTMENT_TAB_SLUGS = {
  PENDENTE: 'pendentes',
  CONFIRMADA: 'confirmadas',
  REALIZADA: 'realizadas',
  others: 'recusadas-canceladas',
} as const;

export type AppointmentTabSlug =
  (typeof APPOINTMENT_TAB_SLUGS)[TabKey];

const SLUG_TO_TAB: Record<AppointmentTabSlug, TabKey> = {
  pendentes: 'PENDENTE',
  confirmadas: 'CONFIRMADA',
  realizadas: 'REALIZADA',
  'recusadas-canceladas': 'others',
};

const TABS: {
  key: TabKey;
  slug: AppointmentTabSlug;
  label: string;
  match: AppointmentStatus[];
}[] = [
  {
    key: 'PENDENTE',
    slug: APPOINTMENT_TAB_SLUGS.PENDENTE,
    label: 'Pendentes',
    match: ['PENDENTE'],
  },
  {
    key: 'CONFIRMADA',
    slug: APPOINTMENT_TAB_SLUGS.CONFIRMADA,
    label: 'Confirmadas',
    match: ['CONFIRMADA'],
  },
  {
    key: 'REALIZADA',
    slug: APPOINTMENT_TAB_SLUGS.REALIZADA,
    label: 'Realizadas',
    match: ['REALIZADA'],
  },
  {
    key: 'others',
    slug: APPOINTMENT_TAB_SLUGS.others,
    label: 'Recusadas / Canceladas',
    match: ['RECUSADA', 'CANCELADA'],
  },
];

export function PatientAppointments() {
  const navigate = useNavigate();
  const { status: statusSlug } = useParams<{ status?: string }>();
  const { data, isPending, isError, refetch } = useAppointments();

  const tab =
    statusSlug && statusSlug in SLUG_TO_TAB
      ? SLUG_TO_TAB[statusSlug as AppointmentTabSlug]
      : 'PENDENTE';

  if (statusSlug && !(statusSlug in SLUG_TO_TAB)) {
    return <Navigate to="/patient/appointments/pendentes" replace />;
  }

  function goToTab(next: TabKey) {
    const slug = APPOINTMENT_TAB_SLUGS[next];
    navigate(`/patient/appointments/${slug}`, { replace: true });
  }

  return (
    <PageSkeleton
      title="Minhas consultas"
      subtitle="Acompanhe suas solicitações: pendentes, confirmadas, realizadas, recusadas e canceladas."
    >
      {isError ? (
        <ErrorState
          message="Ocorreu um erro ao carregar suas consultas."
          onRetry={() => refetch()}
        />
      ) : isPending ? (
        <Stack gap="md">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={96} radius={22} />
          ))}
        </Stack>
      ) : (
        <Tabs
          value={tab}
          onChange={(v) => goToTab((v as TabKey) ?? 'PENDENTE')}
          color="psiGreen"
          radius="md"
        >
          <Tabs.List mb="lg">
            {TABS.map((t) => {
              const count = data.filter((a) => t.match.includes(a.status)).length;
              return (
                <Tabs.Tab key={t.key} value={t.key}>
                  {t.label}
                  {count > 0 && (
                    <Badge
                      ml={8}
                      size="sm"
                      variant="light"
                      color="psiGreen"
                      radius="sm"
                    >
                      {count}
                    </Badge>
                  )}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          {TABS.map((t) => {
            const items = data.filter((a) => t.match.includes(a.status));
            return (
              <Tabs.Panel key={t.key} value={t.key}>
                <AppointmentList items={items} />
              </Tabs.Panel>
            );
          })}
        </Tabs>
      )}
    </PageSkeleton>
  );
}

function AppointmentList({ items }: { items: PatientAppointment[] }) {
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={IconCalendarOff}
        title="Nada por aqui"
        description="Você não tem consultas nesta categoria."
        action={{
          label: 'Encontrar psicólogos',
          icon: <IconSearch size={16} />,
          onClick: () => navigate('/patient/search'),
        }}
      />
    );
  }

  return (
    <Stack gap="md">
      {items.map((a) => (
        <AppointmentRow key={a.id} a={a} />
      ))}
    </Stack>
  );
}

function AppointmentRow({ a }: { a: PatientAppointment }) {
  const cancel = useCancelAppointment();
  const meta = statusMeta[a.status];
  const canCancel = a.status === 'PENDENTE' || a.status === 'CONFIRMADA';

  function handleCancel() {
    cancel.mutate(a.id, {
      onSuccess: () =>
        notifications.show({
          color: 'gray',
          title: 'Consulta cancelada',
          message: `Sua consulta com ${a.psychologistName} foi cancelada.`,
        }),
      onError: (err) =>
        notifications.show({
          color: 'red',
          title: 'Não foi possível cancelar',
          message:
            err instanceof Error ? err.message : 'Tente novamente em instantes.',
        }),
    });
  }

  return (
    <Box className="psi-card" p="lg">
      <Group justify="space-between" wrap="nowrap" align="center">
        <Group gap={14} wrap="nowrap">
          <Avatar src={a.psychologistAvatar} size={52} radius="xl" />
          <Box>
            <Text fw={700} fz={15}>
              {a.psychologistName}
            </Text>
            <Text fz={13} c={palette.textSecondary}>
              {a.weekday}, {shortDate(a.date)} às {a.time} •{' '}
              {modalityLabel[a.modality]}
            </Text>
            <Text fz={12} c={palette.textSecondary}>
              {a.specialty}
            </Text>
          </Box>
        </Group>

        <Stack gap={10} align="flex-end">
          <Badge color={meta.color} variant="light" radius="sm" size="lg">
            {meta.label}
          </Badge>
          {canCancel && (
            <Button
              size="xs"
              variant="subtle"
              color="red"
              radius="xl"
              loading={cancel.isPending}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          )}
        </Stack>
      </Group>
    </Box>
  );
}
